# Introduction au C++
## Cours n°11.1 <div style="font-size:50%;">(chap 11 du poly)</div>
<span class="myname"></span>
#### Slides par  Mathis Petrovich et Liza Belos



## Accesseurs rapide et efficaces



## Référence comme type de retour
### Erreur souvent rencontrée 
```cpp
int i; // Variable globale
int f() {
   return i;
}
...
   f()=3; // Ne veut rien dire (pas plus que 2=3)
// On ne range pas une valeur dans le retour d'une fonction
```



## Référence comme type de retour
### Il faut renvoyer une référence
```cpp
int i; // Variable globale
int& f() {
   return i;
}
...
   f()=3; // OK! Met 3 dans i !
```

<span class="fragment">

### Attention : c'est <a style="color: #fb2c40">dangereux</a>
```cpp
int& f() {
  int i; // Var. locale
  return i; // référence vers une variable qui va mourir! 
            // C'EST GRAVE!
}
...
  f()=3; // NON!!! Le i n'existe plus => erreur
```
</span>



## Utilisation avec les accesseurs

<div class="container">
<div class="col">

### Avant 
<div style="font-size: 85%">

```cpp
class point {
  double x[N];
public:
  void set(int i,double v);
};
void point::set(int i,double v) {
  x[i]=v;
}
...
  point p;
  p.set(1,2.3);
```
</div>
</div>
<div class="col">

### Après
<div style="font-size: 85%">

```cpp
class point {
  double x[N];
public:
  double& element(int i);
};
double& point::element(int i) {
  return x[i];
}
...
  point p;
  p.element(1)=2.3;
```
</div>
</div>
</div>



## Accesseurs avec parenthèse

<div class="container">
<div class="col">

### Point
<div style="font-size: 78%">

```cpp
class point {
  double x[N];
public:
  double& operator()(int i);
};
double& point::operator()(int i) {
  return x[i];
}
...
  point p;
  p(1)=2.3; // Joli, non?
```

</div>
</div>
<div class="col">

### Matrices

<div style="font-size: 78%">

```cpp
class mat {
  double x[M*N];
public:
  double& operator()(int i,int j);
};
double& mat::operator()(int i,int j) {
  return x[i+M*j];
}
...
  mat A;
  A(1,2)=2.3; 
```
</div>
</div>
</div>



## Surcharge et méthode constante
### Problème
```cpp
void f(mat& A) {
    A(1,1)=2; // OK
}
void g(const mat& A) {
    double x=A(1,1); // NON! Le compilateur ne sait pas que
                     // cette ligne ne modifiera pas A!
}
```



## Surcharge et méthode constante
### Solution
<div style="font-size: 80%">

```cpp [1-8|9-14|]
class mat {
  double x[M*N];
public:
  // Même nom, mêmes paramètres, mais l'une est 'const'!
  // Donc surcharge possible
  double& operator()(int i,int j);
  double operator()(int i,int j)const; 
};
double mat::operator()(int i,int j) const {
  return x[i+M*j];
}
double& mat::operator()(int i,int j) {
  return x[i+M*j];
}
void f(mat& A) {
   A(1,1)=2; // OK, appelle le premier operator()
}
void f(const mat& A) {
   double x=A(1,1); // OK, appelle le deuxième
}
```
</div>



## Fonctions inline
### Problème
Appeler une fonction + récuperer sa valeur de retour => complexe et long

<div style="font-size: 75%">

Parfois le mécanisme d'appel est plus long que la fonction elle-même..
</div>

<span class="fragment">

### Solution : recopie du code
```cpp
inline double sqr(double x) {
   return x*x;
}
   ... 
   double y=sqr(z-3);
   // équivalent à y=(z-3)(z-3)
   // mais sans appel de fonction !
```
</span>



## Fonctions inline
### Précautions
<div style="font-size: 90%">

- Recompilé à chaque fois:
  - ralentit la compilation 
  - augmente la taille du programme 
- A utilisé pour des fonctions courtes
- A définir uniquement dans les fichiers .h <a style="color: #fb2c40">:(</a>
- Bénéfice qu'en mode Release
</div>



## Méthodes inline
Dans le fichier .h de la classe.

#### Peut être mis dans la définition de la classe

```cpp
class mat {
  double x[M*N];
public:
  inline double& operator()(int i,int j) { 
     return x[i+M*j];
  }
  inline double operator()(int i,int j)const {
     return x[i+M*j];
  }
};
```



## Assertions
N'oubliez pas d'en mettre : facilite le debugging
```cpp
#include <cassert>

class mat {
  double x[M*N];
public:
  inline double& operator()(int i,int j) { 
     assert(i>=0 && i<M && j>=0 && j<N);
     return x[i+M*j];
  }
  inline double operator()(int i,int j)const {
     assert(i>=0 && i<M && j>=0 && j<N);
     return x[i+M*j];
  }
};
```



## Types énumérés
Pour rendre le code plus lisible
```cpp
enum Dir {nord,est,sud,ouest};
void avance(Dir direction);
```

### Explications
Définit un nouveau type, qui masque des entiers.
```
enum Code {C10=200, // on peut forcer certaine valeurs
           C11=231, 
           C12=240, 
           C13,  // Vaudra 241
           C14}; //   "    242
```



# Chaînes de caractères



## Chaînes de caractères
### Déclaration
```cpp
#include <string>
using namespace std;
...
string s="hop";
char c=s[0];
int l=s.size();
```



## Chaînes de caractères
### Comparaison (ordre alphabétique)
```cpp
if (s1==s1) ...
if (s1!=s2) ...
if (s1<s2) ...
if (s1>s2) ...
if (s1>=s2) ...
if (s1<=s2) ...
```




## Chaînes de caractères
### Trouver la position d'un caractère
```cpp
size_t i=s.find('h');   // position de 'h' dans s?
size_t j=s.find('h',3); // position de 'h' dans s
                        // à partir de la position 3,
                        // en ignorant s[0] à s[2]
```						




## Chaînes de caractères
### Concaténation
```cpp
string a="comment";
string b="ça va?";
string txt=a+" "+b;
```



## Chaînes de caractères
### Extraire une sous-chaine
```cpp
string s1="un deux trois";
string s2=string(s1,3,4); // sous chaîne de longueur 4
                          // commençant en s1[3] (ici "deux")
						  // equivalent en python à s1[3:3+4]
```




## Chaînes de caractères
### Récupération au clavier (<a style="color: #fb2c40">problème</a>)
```cpp
string s;
cin >> s;
```
<span class="fragment">

### <a style="color: #fb2c40">Problème</a>
Coupe la chaîne si l'on appuie sur:
- la touche "Entrée" 
- au premier espace rencontré
</span>



## Chaînes de caractères
### Récupération au clavier (<a style="color: #2c40fb">solution</a>)
```cpp
string s;
getline(cin,s); // Toute la ligne jusqu'à "Entrée"

getline(cin,s,':'); // Tout jusqu'à un ':' (non compris)
```




## Chaînes de caractères
#### Convertir une string en une chaîne au format C
```cpp
string s="hop hop";
const char *t=s.c_str();
```
Utile dans certains appels de fonction.




## Les fichiers
### Lecture et écriture
```cpp
#include <fstream>
using namespace std;
...
    ofstream f("hop.txt"); // écriture
    f << 1 << ' ' << 2.3 << ' ' << "salut" << endl;
    f.close();

    ifstream g("hop.txt"); // lecture
    int i;
    double x;
    string s;
    g >> i >> x >> s;
    g.close();
```




## Les fichiers
### Eviter les erreurs d'ouverture
```cpp
ifstream g("../data/hop.txt");
	if (!g.is_open()) {
	cout << "help!" << endl;
	return 1;
}
```




## Les fichiers
### Attention au slashs
- Toujours utiliser le slash <a style="color: #2c40fb">/</a> 
- Et non le backslash <a style="color: #fb2c40">\\</a> (même sous Windows)




## Les fichiers
### Fin de fichier
Savoir si on est arrivé au bout du fichier:
```cpp
    do {
      ...
    } while (!(g.eof());
```




## Les fichiers
### Chemin relatif avec Imagine++
```cpp
ifstream g(srcPath("hop.txt"));
```

### Ouverture tardive
```cpp
ofstream f;
f.open(srcPath("hop.txt"));
```




## Les fichiers
### Moins fréquent, mais très utile à connaître
Ecrire dans un fichier la suite d'octets en mémoire

```cpp
    double x[10];
    double y;
    ofstream f("hop.bin",ios::binary); // ne pas oublier
    f.write((const char*)x,10*sizeof(double));
    f.write((const char*)&y,sizeof(double));
    f.close();
    ...
    ifstream g("hop.bin",ios::binary); // ne pas oublier
    g.read((char*)x,10*sizeof(double));
    g.read((const char*)&y,sizeof(double));
    g.close();
```
Fichier plus léger => écriture/lecture plus rapides




## Chaînes et fichiers
### Lecture d'une chaîne
Comme avec cin:

```cpp
// Evite le problème d'espace
getline(g,s); // Arrête la lecture au dernier saut de ligne
getline(g,s,':'); // Evite le problème d'espaces
```



## Objets et fichiers
<div style="font-size: 80%">

```cpp []
struct point {
    int x,y;
};

ostream& operator<<(ostream& f,const point& p) {
    f << p.x << ' ' << p.y; // ou quoi que ce soit d'autre!
                            // (on a décidé ici d'écrire les deux
                            // coordonnées séparées par un espace...)
    return f;
}

istream& operator>>(istream& f,point& p) {
    f >> p.x >> p.y; // ou quoi que ce soit d'autre!
    return f;
}
    ...
    point p;
    cin >> p;
    cout << p;
    ofstream f("../hop.txt");
    f << p;
    ...
    ifstream g("../hop.txt");
    g >> p;
```
</div>




## Valeurs par défaut
<div class="container">
<div class="col">

#### Définition

<div style="font-size: 80%">

```cpp
void f(int a,int b=0,int c=0) {
    // ...
}

void g() {
    f(12);    // Appelle f(12,0,0);
    f(10,2);  // Appelle f(10,2,0);
    f(1,2,3); // Appelle f(1,2,3);
}
```
</div>
</div>
<div class="col">

#### Déclaration et définition

<div style="font-size: 80%">

```cpp
void f(int a,int b=0); // déclaration

void g() {
    f(12);   // Appelle f(12,0);
    f(10,2); // Appelle f(10,2);
}

// ne pas re-préciser ici 
// le b par défaut...
void f(int a,int b) { 
    // ...
}
```
</div>
</div>
</div>



## Valeurs par défaut : exemple
<div class="container">
<div class="col">

<div style="font-size: 85%">

Avant
</div>

<div style="font-size: 75%">

```cpp
int f(int a,int b) {
   ...
}
```
</div>
</div>
<div class="col">

<div style="font-size: 85%">

Avec comportement spécial
</div>
<div style="font-size: 75%">

```cpp
int f(int a,int b,bool special=false) {
   ...
}
```
</div>
</div>
</div>

<div style="font-size: 95%">

- Laisse les anciens appels inchangés
- f(.,.,true) dans des cas particuliers
</div>



### Valeurs par défaut : erreurs fréquentes
#### Vouloir en donner aux paramètres au milieu de la liste
```cpp
void f(int a,int b=3,int c) { // NON! Les derniers paramètres
                              // Pas ceux du milieu!
}
```

#### Engendrer des problèmes de surcharge
```cpp
void f(int a) {
  ...
}
void f(int a,int b=0) { // Problème de surcharge!
   ...                  // On ne saura pas résoudre f(1)
}
```




## Page du cours
http://imagine.enpc.fr/~monasse/Info/

### Fiche de référence du cours
Poly : <a style="color: #fb2c40">page 170</a>
