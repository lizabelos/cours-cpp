# Introduction au C++
## Cours n°9 <div style="font-size:50%;">(chap 10 du poly)</div>
### Mathis Petrovich



# Constructeurs et Destructeurs



### Problème
<div class="container">
<div class="col">

#### Avant les objets
```cpp
struct point {
  int x,y;
};
...

point a;
a.x=2;
a.y=3;
i=a.x;
j=a.y;
// Possible
point b={2,3};
```
</div>
<div class="col">

#### Avec les objets
```cpp
class point {
  int x,y;
public:
  void get(int&X, int&Y);
  void set(int X,int Y);
};
...
point a;
a.set(2,3);
a.get(i,j);
// Impossible
point b={2,3};
```

</div>
</div>

<span class="fragment">
<a style="color: #fb2c40">On ne peut pas remplir les champs privés d'un objet</a>, <a style="color: #2c40fb">même à l'initialisation</a>
=> cela permettrait d'accéder en écriture à une partie privée.
</span>




## Les constructeurs
<div style="font-size: 90%">

```cpp [1-6|8-13|17-21]
class point {
	int x,y;
public:
	// déclaration du constructeur
	point(int X,int Y);
};

// définition du constructeur
// pas de type de retour
point::point(int X,int Y) {
	x=X;
	y=Y;
}

...

point a(1,2); // OK! Valeurs initiales
// On ne fait pas comme ça pour changer les champs de a.
a.point(3,4); // ERREUR! 
// Mais plutôt comme ça.
a.set(3,4);   // OK!
```
</div>



## Le constructeur vide
```cpp
class obj {
public:
  obj();
};
obj::obj() {
  cout << "hello" << endl;
}
...
  obj a; // appelle le constructeur par défaut
```

Affiche "hello"



## Plusieurs constructeurs
```cpp [1-6|8-11|13-15|18-19]
class point {
  int x,y;
public:
  point(int X,int Y);
  point(int V);
};

point::point(int X,int Y) {
  x=X;
  y=Y;
}

point::point(int V) {
  x=y=V;
}

...
  point a(2,3); // construit avec point(X,Y)
  point b(4);   // construit avec point(V)
```



### Attention au constructeur vide!
```cpp [|20]
class point {
  int x,y;
public:
  point(int X,int Y);
  point(int V);
};

point::point(int X,int Y) {
  x=X;
  y=Y;
}

point::point(int V) {
  x=y=V;
}

...
  point a(2,3); // construit avec point(X,Y)
  point b(4);   // construit avec point(V)
  point c; // ne marche plus!
```



## Attention au constructeur vide!
### Si on ne définit <a style="color: #2c40fb">aucun constructeur</a>
Il existe un constructeur vide par défaut.



## Attention au constructeur vide!
### Dès qu'on définit un constructeur
<a style="color: #fb2c40">Le constructeur vide n'existe plus</a>, sauf si on le redéfinit soi-même.

```cpp
class point {
  int x,y;
public:
  point(int X,int Y);
  point(int V);
  point();
};
...
point::point() {
...
}
```



## Tableaux d'objets
```cpp
// Construit 3 fois avec le constructeur vide
// sur chacun des éléments du tableau
point t[3];

// Idem, n fois
point *s = new point[n];

// ERREUR et HORREUR !! Ceci est impossible !!
point *u = new point(1,2)[n];
```
Impossible de spécifier globalement quel constructeur est appelé pour les éléments d’un tableau. 

<span class="fragment">
=> <a style="color: #fb2c40">C’est toujours</a> le constructeur vide qui est appelé.
</span>



## Tableaux d'objets
### Il faudra donc écrire:
```cpp
point* u=new point[n];
for (int i=0;i<n;i++)
	u[i].set(1,2);
```
Ce qui n'est pas vraiment identique

### Syntaxe possible pour taille fixe
```cpp
point t[3]={point(1,2),point(2,3),point(3,4)};
```




## Objets temporaires
On peut construire un objet sans qu'il soit rangé dans une variable.

=> En fait il s'agit d'un <a style="color: #2c40fb">objet temporaire</a> sans nom de variable et qui meurt le plus tôt possible.

<span class="fragment">

### Syntaxe

<div class="container">
<div class="col">

```cpp
point g() {
// definit l'object
  point e(1,2);
  return e;
}
```

</div>
<div class="col">

```cpp
point g() {
// retourne directement 
// l'objet temporaire
  return point(1,2);
}
```
</div>
</div>

</span>



## Objets temporaires
### Attention erreur <a style="color: #fb2c40">très fréquente</a>
Ne pas faire :
```cpp
point p=point(1,2); // NON!!!!!!!
```
Mais plutôt :
```cpp
point p(1,2);       // OUI!
```



## Objets temporaires
### Exemple sans
```cpp
point point::operator+(point b) {
  point c(x+b.x,y+b.y);
  return c;
}
...
  point a(1,2),b(2,3);
  c=a+f(b);
```

### Exemple avec
```cpp
point point::operator+(point b) {
  return point(x+b.x,y+b.y);
}
...
  c=point(1,2)+f(point(2,3));
```



## Références constantes
<div style="font-size: 70%">

```cpp
const int N=1000;
class vecteur {
  double t[N];
  ...
};
class matrice {
  double t[N][N];
  ...
};
// résout AX=B
void solve(matrice A,vecteur B,vecteur& X) {
   ...
}
   ...
   vecteur b,x;
   matrice a;
   ...
   solve(a,b,x); // résout ax=b
```

</div>

Lorsqu'on passe un objet en paramètre à une fonction, il est recopié. 

=> Cette recopie est <a style="color: #fb2c40">source d'inefficacité.</a> 



### Première idée
Passer les arguments par références
```cpp
void solve(matrice& A,vecteur& B,vecteur& X) {
...
}
```
<span class="fragment">

### <a style="color: #fb2c40">Danger</a>
A et b peuvent être modifié! Et ça peut être génant..
</span>



## Référence constantes
```cpp
void solve(const matrice& A,const vecteur& B,vecteur& X) {
...
}
```
Demander au compilateur de vérifier qu'une variable passée par référence :
- n'est pas modifiée par la fonction.
- ni par les sous-fonctions appelé par solve




## Référence constantes
### Comment le compilateur fait ?
Pour les fonctions et sous-fonctions:

=> Il ne se base <a style="color: #fb2c40">que sur la déclaration</a> et non sur sa définition complète.



## Référence constantes
Remplacer "obj o" par "const obj& o" est utile pour <a style="color: #2c40fb">accélerer les programmes.</a>

(surtout si les objects sont de tailles importantes)



## Méthodes constantes
```cpp
class point {
    int x, y;
public:
    void set(int X, int Y);
    int getX() const;
    int getY() const;
};

int point::getX() const {
    return x;
}
```
Une méthode constante peut lire les membres, mais ne peut pas les modifiers.



## Pourquoi préciser ?
- Moyen de préciser sa pensée
- Découverte de <a style="color: #fb2c40">bug</a> à la compilation
- Programme plus <a style="color: #2c40fb">rapide</a>




## Le destructeur
<div style="font-size: 70%">

```cpp
class obj {
public:
    obj(); // constructeur
    ~obj(); // destructeur 
};
// constructeur
obj::obj() {
    cout << "Bonjour !" << endl;
}
// destructeur 
obj::~obj() {
    cout << "Au revoir !" << endl;
}

void f() {
    // affiche "Bonjour !"
    obj monobj;

    // ...

    // A la fin de f(), obj est détruit.
    // Son destructeur est appelé,
    // et affiche "Au revoir !"
}
```
</div>

Lorsqu’un objet meurt, <a style="color: #fb2c40">le destructeur</a> est appelé.



### Rappel: La <a style="color: #2c40fb">portée</a> des variables (le *scope*)
```cpp [1-3|4-7|8]
int i;
i=j; // Erreur : j n'existe pas encore!
int j=2;
if (j>1) {
	int k=3;
	j=k;
}
i=k; // Erreur : k n'existe plus.
```



## Destructeurs et tableaux
Appel pour <a style="color: #2c40fb">tous</a> les éléments du tableau:
- Constructeur vide : 10x en ligne 2
- Destructeur : 10x en ligne 4

```cpp []
if (a==b) {
	obj t[10];
	...
}
```



## Destructeurs et tableaux
Pour l'allocation dynamique:

```cpp []
if (a==b) {
	obj* t=new obj[n]; // n appels à obj()
	...
	delete[] t;        // n appels à ~obj();
}
```



### Exemple de destructeur
<div style="font-size: 80%">

```cpp []
class obj {
    char *tab;
    int tabsize;
public:
    obj(int n);
    ~obj();
};

obj::obj(int n) {
    tab = new char[n]
    tabsize = n;
}

obj::~obj() {
    delete[] tab;
}

int main() {
    obj monobj(10);
    // ...
    return 0;
}
```
</div>



## Constructeur de copie
### Déclaration
```cpp
obj::obj(const obj& o);
```
### Utilisation
```cpp
obj a;
obj b(a); // b à partir de a
obj c=a;  // c à partir de a, synonyme de c(a)}
```
Et aussi pour construire les paramètres des fonctions et leur valeur de retour.



## Constructeur de copie
### Ne pas confondre avec
```cpp
obj a,b;
b=a; // ceci n'est pas un constructeur!
// c'est une affectation
```

### Comportement par défaut
Lorsqu’il n’est pas programmé explicitement

=> <a style="color: #2c40fb">recopie tous les champs</a> de l’objet à copier dans l’objet construit.



### Attention au double delete!
<div style="font-size: 70%">

```cpp []
class obj {
    char *tab;
    int tabsize;
public:
    obj(int n);
    ~obj();
};

obj::obj(int n) {
    tab = new char[n]
    tabsize = n;
}

obj::~obj() {
    delete[] tab;
}

int main() {
    obj monobj(10);
    obj copiedeobj = monobj; // constructeur de copie par défaut
    return 0; // tab est détruit 2 fois !!
}
```
</div>



### Solution : Constructeur de copie
<div style="font-size: 70%">

```cpp [1-8|15-21|27-31]
class obj {
    char *tab;
    int tabsize;
public:
    obj(int n);
    obj(obj &o);
    ~obj();
}

obj::obj(int n) {
    tab = new char[n]
    tabsize = n;
}

obj::obj(const obj &o) {
    tab = new char[o.tabsize];
    tabsize = o.tabsize;
    for (int i = 0; i < tabsize; i++) {
        tab[i] = o.tab[i];
    }
}

obj::~obj() {
    delete[] tab;
}

int main() {
    obj monobj(10);
    obj copiedeobj = monobj; // Appel le constructeur de copie
    return 0; // OK !!
}
```
</div>




## Opérateur d'affection
### Déclaration
```cpp
void obj::operator=(const obj& o);
```

### Utilisation
```cpp
obj a,b;
a=b; // se lit a.operator=(b)
```

### Comportement par défaut
Recopie <a style="color: #2c40fb">tous les champs</a> de b dans a



## Opérateur d'affection
### Enchainer les affectations
Retourner l'objet à la fin
```cpp
// Déclaration (dans le class { };)
obj obj::operator=(const obj& o);

// Exemple
a=b=c; // se lit a=(b=c);
```

#### Encore mieux (ne copie pas l'objet dans le return)
```cpp
const obj& obj::operator=(const obj&o);
```



## Opérateur d'affection
### Conseil
Reprogrammer cette opérateur uniquement lorsque :
le comportement par défaut <a style="color: #fb2c40">ne convient pas</a>.




### Objets avec allocation dynamique
<div style="font-size: 70%">

```cpp []
#include <iostream>
using namespace std;

class vect {
    int n;
    double *t;
public:
    void alloue(int N);
    void libere();
};

void vect::alloue(int N) {
    n=N;
    t=new double[n];
}

void vect::libere() {
    delete[] t;
}

int main()
{
    vect v;
    v.alloue(10);
    ...
    v.libere();
    return 0;
}
```
</div>



### Objets avec allocation dynamique
<div style="font-size: 70%">

```cpp []
#include <iostream>
using namespace std;

class vect {
    int n;
    double *t;
public:
    vect(int N);
    ~vect();
};

vect::vect(int N) {
    n=N;
    t=new double[n];
}

vect::~vect() {
    delete[] t;
}

int main()
{
    vect v(10);
    ... 
    return 0;
}
```
</div>



### Problème simple
Si on rajoute un constructeur vide:
```cpp
vect::vect() {
}
```
<span class="fragment">

Il ne faut plus <a style="color: #fb2c40">désallouer t</a> (qui est vide!)

#### <a style="color: #2c40fb">Solution</a>
```cpp
vect::vect() {
	n=0;
}

vect::~vect() {
    if (n!=0)
       delete[] t;
}
```
</span>




### Problème plus compliqué
Ce programme ne marche pas:
```cpp
int main()
{
  vect v(10),w(10);
  w=v;
  return 0;
}
```
<span class="fragment">

L'affectation <a style="color: #fb2c40">recopie</a> les champs de v dans w
- v et w se retrouvent avec <a style="color: #fb2c40">les mêmes champs t</a>
  - Valeurs liées : <a style="color: #fb2c40">résultats faux</a>
  - désallocation deux fois (<a style="color: #fb2c40">erreurs</a> possible)
  - <a style="color: #2c40fb">fuite</a> de mémoire sur l'autre (w.t d'origine)
</span>



### Solution: operateur d'affecation
```cpp []
const vect& vect::operator=(const vect& v) {
    if (n!=0)
        delete[] t; // On se desalloue si necessaire
    n=v.n;
    if (n!=0) {
        t=new double[n]; // Reallocation et recopie
        for (int i=0;i<n;i++)
            t[i]=v.t[i];
    }
    return v;
}
```
### Problème
Ne marche pas avec l'instruction:
```cpp
vect v(10);
v=v;
```



### Solution finale fonctionnelle
<div style="font-size: 70%">

```cpp [4-22|24-39|41-55|57-63]
#include <iostream>
using namespace std;

class vect {
    // champs
    int n;
    double *t;
    // fonctions privées
    void alloc(int N);
    void kill();
    void copy(const vect& v);
public:
    // constructeurs
    vect();
    vect(const vect& v);
    // destructeur
    ~vect();
    // affectation
    const vect& operator=(const vect& v);
    // constructeurs supplémentaires
    vect(int N);
};

void vect::alloc(int N) {
    n=N;
    if (n!=0)
        t=new double[n];
}

void vect::kill() {
    if (n!=0)
        delete[] t;
}

void vect::copy(const vect& v) {
    alloc(v.n);
    for (int i=0;i<n;i++) // OK même si n==0
        t[i]=v.t[i];
}

vect::vect() {
    alloc(0);
}

vect::vect(int N) {
    alloc(N);
}

vect::vect(const vect& v) {
    copy(v);
}

vect::~vect() {
    kill();
}
  
const vect& vect::operator=(const vect& v) {
    if (this!=&v) { // instruction pour savoir si c'est pas le même objet
        kill();
        copy(v);
    }
    return v;
}
```
</div>




## Page du cours
http://imagine.enpc.fr/~monasse/Info/

### Fiche de référence du cours
Poly : <a style="color: #fb2c40">page 154</a>
