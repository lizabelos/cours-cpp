# C++
## Chapitre 1



## Rappels : Présentation
<div style="font-size: 70%; text-align: left; padding: 0 5%;">

- **Lisibilité** : Indentez correctement, aérez votre code.
- **Concision** : Lignes et fonctions courtes. 
- **Zéro accent** : Variables et `cout` sans accents.

<div class="container" style="margin-top: 20px;">
<div class="col" style="padding-right: 15px;">
<h4 style="color: #fb2c40;">❌ À éviter</h4>

```cpp
int calcule_résultat(int a,int b){
int res=a+b;
    return res;}
```

</div>
<div class="col" style="padding-left: 15px;">
<h4 style="color: #4CAF50;">✅ Bonnes pratiques</h4>

```cpp
int calculeResultat(int a, int b) {
    int res = a + b;
    return res;
}
```

</div>
</div>
</div>




## Rappels : Fichiers
<div style="font-size: 70%; text-align: left; padding: 0 5%;">

- **Noms** : Minuscules sans espaces (casse Linux).
- **Entête** : `#pragma once` dans chaque `.h`.
- **Découpage** : `.h` (déclarations) / `.cpp` (implémentations).

<div class="container" style="margin-top: 20px;">
<div class="col" style="padding-right: 15px;">
<h4 style="color: #fb2c40;">❌ À éviter</h4>

```cpp
// main.cpp
#include "Mon_Fichier.cpp"
```
*(Inclure un `.cpp` est strictement interdit !)*

</div>
<div class="col" style="padding-left: 15px;">
<h4 style="color: #4CAF50;">✅ Bonnes pratiques</h4>

```cpp
// math_utils.h
#pragma once
int addition(int a, int b);

// main.cpp
#include "math_utils.h"
```

</div>
</div>
</div>




## Rappels : Bonnes Pratiques
<div style="font-size: 70%; text-align: left; padding: 0 5%;">

- **Toujours initialiser** ses variables.
- **Pas de variables globales** (utiliser `const`).
- **Tableaux dynamiques** si la taille est variable.

<div class="container" style="margin-top: 20px;">
<div class="col" style="padding-right: 15px;">
<h4 style="color: #fb2c40;">❌ À éviter</h4>

```cpp
int PI = 3.14; // Globale

void foo(int n) {
    int x; // Non initialisée
    int tab[n]; // Interdit en C++ standard
}
```

</div>
<div class="col" style="padding-left: 15px;">
<h4 style="color: #4CAF50;">✅ Bonnes pratiques</h4>

```cpp
const float PI = 3.14f; 

void foo(int n) {
    int x = 0; 
    int* tab = new int[n]; 
    // ...
    delete[] tab;
}
```

</div>
</div>
</div>




## Rappels : Outils & Débogage
<div style="font-size: 70%; text-align: left; padding: 0 5%;">

- **Débogueur** prioritaire sur les `cout`.
- **`assert`** (`<cassert>`) pour valider les préconditions.
- **Chemins relatifs** uniquement.

<div class="container" style="margin-top: 20px;">
<div class="col" style="padding-right: 15px;">
<h4 style="color: #fb2c40;">❌ À éviter</h4>

```cpp
void diviser(int a, int b) {
    // Débogage manuel
    std::cout << "b vaut " << b << "\n";
    // Chemin absolu en dur
    Image img("C:/Users/img.png");
}
```

</div>
<div class="col" style="padding-left: 15px;">
<h4 style="color: #4CAF50;">✅ Bonnes pratiques</h4>

```cpp
#include <cassert>

void diviser(int a, int b) {
    // Plante (proprement) si b == 0
    assert(b != 0); 
    // Chemin relatif
    Image img(srcPath("img.png"));
}
```

</div>
</div>
</div>




## Rappels : Les matrices
<div style="font-size: 75%; text-align: left; padding: 0 5%;">

```cpp
// Une matrice stockée en mémoire ligne par ligne
struct Matrice {
    int width, height;
    int* data;
};

int main() {
    Matrice m;
    m.width = 3; m.height = 3;
    m.data = new int[m.width * m.height];

    for(int y = 0; y < m.height; ++y) {
        for(int x = 0; x < m.width; ++x) {
            m.data[y * m.width + x] = 0;
        }
    }
    return 0;
}
```

<div class="fragment" style="margin-top: 20px; padding: 15px; border-left: 5px solid #fb2c40; background: rgba(251, 44, 64, 0.1);">
<strong>Problème :</strong> Si je décide de changer le stockage pour le faire <em>colonne par colonne</em>, <strong>je dois chercher et modifier la formule <code>y * m.width + x</code> partout dans mon programme !</strong>
</div>

</div>




<div style="font-size: 75%; text-align: left; padding: 0 5%;">

On peut créer des fonctions dédiées pour manipuler les matrices dans tout le code:

```cpp
#include <cassert>

void setElement(Matrice& m, int x, int y, int v) { 
    assert(x >= 0 && x < m.width && y >= 0 && y < m.height);
    m.data[y * m.width + x] = v; 
}

int getElement(const Matrice& m, int x, int y) { 
    assert(x >= 0 && x < m.width && y >= 0 && y < m.height);
    return m.data[y * m.width + x]; 
}

int main() {
    Matrice m;
    m.width = 3; m.height = 3;
    m.data = new int[9];

    setElement(m, 1, 1, 42); // Utilisation propre et sécurisée !
    return 0;
}
```

<div class="fragment" style="margin-top: 20px; padding: 15px; border-left: 5px solid #4CAF50; background: rgba(76, 175, 80, 0.1);">
Si l'organisation mémoire change, je n'ai plus que <strong>ces deux fonctions à modifier</strong>. C'est déjà beaucoup mieux !
</div>

</div>




## 3. L'illusion de la sécurité
<div style="font-size: 75%; text-align: left; padding: 0 5%;">

Cependant, <strong>absolument rien</strong> n'empêche quelqu'un de contourner nos fonctions :

```cpp
int main() {
    Matrice m;
    m.width = 3; m.height = 3;
    m.data = new int[9];

    // Quelqu'un modifie directement le tableau...
    m.data[5] = 42; 

    // ...ou pire, modifie la taille sans réallouer la mémoire !
    m.width = 10; // CRASH potentiel au prochain setElement() !
    
    return 0;
}
```

<div class="fragment" style="margin-top: 20px; text-align: center; font-size: 110%; color: #fb2c40; font-weight: bold;">
Il nous faut un moyen d'interdire l'accès direct aux données pour les PROTÉGER !
</div>

</div>




# La Programmation Orientée Objet 



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




## L'exemple de la Matrice
<div class="container">
<div class="col">

### Procédurale
```cpp
Matrice m;
int val = getElement(m, 1, 1);
```
Les fonctions sont séparées des données qu'elles manipulent.

</div>
<div class="col">

### Orientée Objet
```cpp
Matrice m;
int val = m.getElement(1, 1);
```
La matrice **possède** ses propres fonctionnalités (méthodes).

</div>
</div>




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
<div style="margin-top: 30px; font-size: 85%; padding: 15px; background: rgba(0,0,0,0.05); border-left: 5px solid #6b4ec7;">
Si un objet <code>A</code> possède une méthode nommée <code>operator+(Type B)</code>, alors l'écriture :<br>
<code style="color: #b9436e;">A + B</code> sera automatiquement traduite par le compilateur en : <code style="color: #b9436e;">A.operator+(B)</code>.<br><br>
<em>C'est exactement comme appeler une méthode classique, mais avec une syntaxe plus lisible !</em>
</div>



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



### Solution : le mot clef <a style="color: #2c40fb">class</a>
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
Ici `m`, `n` et `t` sont _protégées_.



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




## Attention
Ne pas abuser des objets surtout en tant que débutant :

### <a style="color: #fb2c40">Dangers</a>
- Instructions et données ne sont pas toujours liées
- Mal penser l’organisation des données ou des instructions en objets
- Conseil : si c'est trop compliqué pour vous => abandonnez les objets