# Introduction au C++
## Cours n°8 <div style="font-size:50%;">(chap 9 du poly)</div>
<span class="myname"></span>
#### Slides par  Mathis Petrovich et Liza Belos



# La Programmation Orientée Objet 
## POO



## Différences
<div class="container">
<div class="col">

### Procédurale
```cpp
obj a;
// fonction f(p) appliquée à a
int i = f(a);
```
Les fonctions travaillent sur des données.

</div>
<div class="col">

### Orientée objet
```cpp
obj a;
// appel à la méthode f() de a
int i = a.f();
```
Les données possèdent des fonctionnalités.

</div>
</div>



## Attention
Ne pas abusé des objets surtout en tant que débutant:

### <a style="color: #fb2c40">Dangers</a>
- Instructions et données ne sont pas toujours liées
- Mal penser l’organisation des données ou des instructions en objets
- Conseil: si c'est trop compliqué pour vous => abandonnez les objets




## Déclaration et définition
<div style="font-size: 80%; line-height: 600%;">

```cpp
struct obj{
	int x;        // champs x
	int f();      // méthode f() (déclaration)
	int g(int y); // méthode g() (déclaration)
};

int obj::f() { // méthode f() de obj (définition)
	...
	return ...
}

int obj::g(int y) { // méthode f() de obj (définition)
	...
	return ...
}

int main() {
	obj a;
	a.x = 2;
	int i = a.f(); // méthode f() de obj (donc obj::f())
	int j = a.g(i); // méthode g() de obj (donc obj::g())
	...
}
```
</div>



## Dans le cas de plusieurs objects
<div style="font-size: 80%; line-height: 600%;">

```cpp
...

int obj1::f() { // méthode f() de obj1 (définition)
	...
	return ...
}

int obj2::f() { // méthode f() de obj2 (définition)
	...
	return ...
}

int main() {
	obj1 a;
	obj2 b;
	int i = a.f(); // méthode f() de obj1 (donc obj1::f())
	int j = b.f(); // méthode f() de obj2 (donc obj2::f())
	...
}
```
</div>




## Visibilité
```cpp
struct Vector {
    double x;   // champs x
    double y;   // champs y
    double norm();
};

int Vector::norm() { // méthode f() de obj1 (définition)
	return sqrt((x * x) + (x * x) + (y * y) + (y * y));
}
```

Dans ses méthodes, un objet accède <a style="color: #2c40fb">directement</a> à ses champs et à ses autres méthodes :

Sans rien mettre devant !



## Exemple des matrices
<div style="font-size: 70%; line-height: 600%;">

```cpp [|10-19|22-28|30-32|34-36|38-40|42-49|51-68|71-91]
#include <iostream>
#include <string>
using namespace std;

//==================================================
// fonctions sur les matrices
// pourraient etre dans un matrice.h et matrice.cpp

// ========= declarations (dans le .h)
struct Matrice {
    int m,n;
    double* t;
    void cree(int m1,int n1);
    void detruit();
    double get(int i,int j);
    void set(int i,int j,double x);
    void affiche(string s);
};
Matrice operator*(Matrice A,Matrice B);

// ========= définitions (dans le .cpp)
void Matrice::cree(int m1,int n1) {
    // Notez que les parametres ne s'appellent plus m et n
    // pour ne pas mélanger avec les champs!
    m=m1;
    n=n1;
    t=new double[m*n];
}

void Matrice::detruit() {
    delete[] t;
}

double Matrice::get(int i,int j) {
    return t[i+m*j];
}

void Matrice::set(int i,int j,double x) {
    t[i+m*j]=x;
}

void Matrice::affiche(string s) {
    cout << s << " =" << endl;
    for (int i=0;i<m;i++) {
        for (int j=0;j<n;j++)
            cout << get(i,j) << " ";
        cout << endl;
    }
}

Matrice operator*(Matrice A,Matrice B) {
    if (A.n!=B.m) {
        cout << "Erreur!" << endl;
        exit(1);
    }
    Matrice C;
    C.cree(A.m,B.n);
    for (int i=0;i<A.m;i++)
        for (int j=0;j<B.n;j++) {
            // Cij=Ai0*B0j+Ai1*B1j+...
            C.set(i,j,0);
            for (int k=0;k<A.n;k++)
                C.set(i,j,
                      C.get(i,j)+A.get(i,k)*B.get(k,j));
            
        }
    return C;
}

// ==================== main ===========
int main()
{
    Matrice A;
    A.cree(2,3);
    for (int i=0;i<2;i++)
        for (int j=0;j<3;j++)
            A.set(i,j,i+j);
    A.affiche("A");
    Matrice B;
    B.cree(3,5);
    for (int i=0;i<3;i++)
        for (int j=0;j<5;j++)
            B.set(i,j,i+j);
    B.affiche("B");
    Matrice C=A*B;
    C.affiche("C");
    C.detruit();
    B.detruit();
    A.detruit();
    return 0;
}
```
</div>



## Opérateur
```cpp
struct Vector {
    double x;
    double y;
    Vector operator*(double factor);
};

Vector Vector::operator*(double factor) {
	Vector result;
    result.x = x * factor;
    result.y = y * factor;
    return result;
}
```
Si un objet "A" a une méthode "operatorop(objB B)" :

"AopB" appellera cette méthode pour tout "B" "objB".



## Exemple avec les matrices
<div style="font-size: 70%; line-height: 600%;">

```cpp
struct Matrice {
    ...
    Matrice operator*(Matrice B);
};
...
// A*B appelle A.operator*(B) donc tous
// les champs et fonctions utilisés directement
// concernent ce qui était préfixé précédemment par A.
Matrice Matrice::operator*(Matrice B) {
    // On est dans l'objet A du A*B appelé
    if (n!=B.m) { // Le n de A
        cout << "Erreur!" << endl;
        exit(1);
    }
    Matrice C;
    C.cree(m,B.n);
    for (int i=0;i<m;i++)
        for (int j=0;j<B.n;j++) {
            // Cij=Ai0*B0j+Ai1*B1j+...
            C.set(i,j,0);
            for (int k=0;k<n;k++)
                // get(i,j) sera celui de A
                C.set(i,j,
                      C.get(i,j)+get(i,k)*B.get(k,j));
            
        }
    return C;
}
```
</div>



## Deuxième type non objet?
<div class="container">
<div class="col" style="font-size: 70%; line-height: 600%;">

### Fonctionne
```cpp
Mat Mat::operator*(double x) {
  ...
}
...
  B=A*2; 
  // Appelle A.operator*(2)
```

</div>
<div class="col" style="font-size: 70%; line-height: 600%;">

### Ne fonctionne pas
```cpp
Mat double::operator*(Mat A) 
// IMPOSSIBLE car double
// n'est pas un objet!
```
double ne vous appartient pas !

</div>
</div>

### Solution : opérateur standard
<div style="font-size: 70%; line-height: 600%;">

```cpp
Mat operator*(double x, Mat A) {
  return A*x; // défini précédemment, rien à reprogrammer!
}
...
  B=2*A; // appelle operator*(2,A) qui appelle à son tour
         // A.operator*(2)
```
</div>



## Interface
```cpp
struct Matrice {
    void cree(int m1,int n1);
    void detruit();
    double get(int i,int j);
    void set(int i,int j,double x);
    void affiche(string s);
    Matrice operator*(Matrice B);
};
```

Les champs des Matrices ne sont plus utilisé:
<a style="color: #2c40fb">seulement leurs méthodes</a> sont utilisés.



## Interface
- Le concepteur et l'utilisateur: accords sur les méthodes disponibles (<a style="color: #2c40fb">fonctionnalitées</a>)
- Le concepteur <a style="color: #2c40fb">implémente</a> (comme il le veux)
- L'utilisateur <a style="color: #2c40fb">utilise</a> les fonctionnalités 
- Le concepteur peut y <a style="color: #2c40fb">retoucher</a> sans gêner l'utilisateur.
- L'utilisateur peut <a style="color: #2c40fb">changer</a> d'implémentation
- Ils sont <a style="color: #40fb2c">indépendants</a>



## Protection
### Pourquoi protéger ?
Empêcher de faire des bêtises:
```cpp
Matrice A;
A.cree(3,2);
A.m=4; // Aie! Les accès vont être faux!
```

Proteger le code de l'implémentation
<div class="container">
<div class="col" style="font-size: 90%; line-height: 600%;">

Bien
```
for (int i=0;i<3;i++)
  for (int j=0;j<2;j++)
    A.set(i,j,0);
```
</div>
<div class="col" style="font-size: 90%; line-height: 600%;">

Horrible
```cpp
for (int i=0;i<6;i++)
  A.t[i]=0; 
```

</div>
</div>



### Solution: le mot clef <a style="color: #2c40fb">class</a>
<div class="col" style="font-size: 70%; line-height: 600%;">

```cpp [1-8|9-13|14-17|18-21|23-30]
class obj {
  int x,y;
  void a_moi();
public:
  int z;
  void pour_tous();
  void une_autre(obj A);
};
void obj::a_moi() {
  x=..;   // OK
  ..=y;   // OK
  z=..;   // OK
}
void obj::pour_tous() {
  x=..;    // OK
  a_moi(); // OK
}
void obj::une_autre(obj A) {
  x=A.x;     // OK
  A.a_moi(); // OK
}
...
int main() {
  obj A,B;
  A.x=..;         // NON!
  A.z=..;         // OK
  A.a_moi();      // NON!
  A.pour_tous();  // OK
  A.une_autre(B); // OK
}
```
</div>



## Mémo
### Remplacer struct par class
- Tous les champs et les méthodes deviennent privés
- Placer les méthodes de "l'interface" dans public




## Structure VS Classes en C++
Une structure est une classe où <a style="color: #2c40fb">tout est public</a>.



## Cas des matrices
```cpp
class Matrice {
    int m,n;
    double* t;
public:
    void cree(int m1,int n1);
    void detruit();
    double get(int i,int j);
    void set(int i,int j,double x);
    void affiche(string s);
    Matrice operator*(Matrice B);
};
```
Ici m, n et t sont _protégées_.



### Retrouver les dimensions d'une matrice ?
### Accesseurs en lecture
```cpp
int Matrice::nbLin() {
  return m; 
}
int Matrice::nbCol() {
  return n;
}
int main() {
  ...
  for (int i=0;i<A.nbLin();i++)
    for (int j=0;j<A.nbCol();j++)
       A.set(i,j,0);
```



### De manière générale
```cpp
class Vector {
    double x;
    double y;
public:
    Vector operator*(double factor);
    double norm();
    double getX();
    void setX(double x);
}
```

Les méthodes <a style="color: #2c40fb">get()</a> et <a style="color: #2c40fb">set()</a> qui permettent d’accéder en <a style="color: #2c40fb">lecture (get)</a> ou en <a style="color: #2c40fb">écriture (set)</a> à notre classe, sont appelées <a style="color: #fb2c40">accesseurs</a>.



## Page du cours
http://imagine.enpc.fr/~monasse/Info/

### Fiche de référence du cours
Poly : <a style="color: #fb2c40">page 133</a>
