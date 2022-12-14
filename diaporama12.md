# Introduction au C++
## Cours n°11.2 <div style="font-size:50%;">(chap 12 du poly)</div>
### Liza Belos
#### Slides par  Mathis Petrovich et Liza Belos



## Fonctions et classes paramétrées 
### <a style="color: #2c40fb">Les templates</a>




## Problème sans les templates
```cpp
void echange(int& a,int& b) {
    int tmp;
    tmp=a;
    a=b;
    b=tmp;
}
  ...
  int i,j;
  ...
  echange(i,j);
```

<span class="fragment">

### <a style="color: #fb2c40"> Dépend du type!</a>
</span>



## Fonctions paramétrées
```cpp
// Echange deux variables de n'importe quel type T
template <typename T>
void echange(T& a,T& b) {
    T tmp;
    tmp=a;
    a=b;
    b=tmp;
}
    ...
    int a=2,b=3;
    double x=2.1,y=2.3;
    echange(a,b); // "instancie" T en int
    echange(x,y); // "instancie" T en double
    ...
```




## Fonctions paramétrées
```cpp
// Maximum de deux variables 
// (a condition que operator>() existe pour le type T)
template <typename T>
T maxi(T a,T b) {
    return (a>b)?a:b;
}
```



### Plusieurs types générique
<div style="font-size: 80%; line-height: 600%;">

```cpp [1-12|14-20]
// Cherche e1 dans le tableau tab1 et met
// dans e2 l'element de tab2 de meme indice
// Renvoie false si non trouvé
template <typename T1,typename T2>
bool cherche(T1 e1,T2& e2,const T1* tab1,const T2* tab2, int n) {
    for (int i=0;i<n;i++) 
        if (tab1[i]==e1) {
            e2=tab2[i];
            return true;
        }
    return false;
}
    ...
    string noms[3]={"jean","pierre","paul"};
    int ages[3]={21,25,15};
    ...
    string nm="pierre";
    int ag;
    if (cherche(nm,ag,noms,ages,3))
        cout << nm << " a " << ag << " ans" << endl;
    ...
```

</div>




## Template et compilateur
### <a style="color: #fb2c40">Pas de magie</a>
Ne travaille pas sur plusieurs types !

### <a style="color: #2c40fb">Réalité</a>
Création d'autant de fonctions que d'utilisations de la fonction générique avec des types différents (d'instanciations)




## Template et compilateur
### Conséquences
- Ralentit la compilation 
- Augmente la taille des programmes.
- On ne peut plus séparer déclaration et définition
  - Tout mettre dans le (.h) <a style="color: #fb2c40">:(</a>




## Classes et template
L'utilisateur doit préciser le type !

<div class="container">
<div class="col">

<div style="font-size: 75%; line-height: 600%;">

```cpp [1-12|]
// Paire de deux variables de type T
template <typename T>
class paire { 
    T x[2];
public:
    // constructeurs
    paire();
    paire(T A,T B);
    // accesseurs
    T operator()(int i) const;
    T& operator()(int i);
};

template <typename T>
paire<T>::paire() {
}

template <typename T>
paire<T>::paire(T A,T B) { 
    x[0]=A; x[1]=B; 
}

```

</div>

</div>
<div class="col">
<div style="font-size: 75%; line-height: 600%;">

```cpp [12|1-11|]
template <typename T>
T paire<T>::operator()(int i) const {
    assert(i==0 || i==1);
    return x[i];
}

template <typename T>
T& paire<T>::operator()(int i) {
    assert(i==0 || i==1);
    return x[i];
}

...

// Utilisation
    ...
    paire<int> p(1,2),r;
    int i=p(1);
    paire<double> q;
    q(0)=2.2;
    ...
	
```
</div>




## Classes et template
### Utilisation avec fonctions inline
<div style="font-size: 80%">

```cpp []
// Paire de deux variables de type T
// Fonctions courtes et rapides en inline
template <typename T>
class paire { 
    T x[2];
public:
    // constructeurs
    inline paire() {}
    inline paire(T A,T B) { x[0]=A; x[1]=B; }
    // accesseurs
    inline T operator()(int i) const {
        assert(i==0 || i==1);
        return x[i];
    }
    inline T& operator()(int i) {
        assert(i==0 || i==1);
        return x[i];
    }
};
```
</div>




## Classes et template
### Plusieurs type génériques
<div style="font-size: 80%">

```cpp []
// Paire de deux variables de types différents
template <typename S,typename T>
class paire { 
public:
    // Tout en public pour simplifier l'exemple
    S x;
    T y;
    // constructeurs
    inline paire() {}
    inline paire(S X,T Y) { x=X; y=Y; }
};
    ...
    paire<int,double> P(1,2.3);
    paire<string,int> Q;
    Q.x="pierre";
    Q.y=25;
    ...
```
</div>




## Classes et template
### Choix d'un entier générique
<div style="font-size: 80%">

```cpp []
// n-uplet de variables de type T
// Attention: chaque nuplet<T,N> sera un type différent !
template <typename T, int N>
class nuplet { 
    T x[N];
public:
    // accesseurs
    inline T operator()(int i) const {
        assert(i>=0 && i<N);
        return x[i];
    }
    inline T& operator()(int i) {
        assert(i>=0 && i<N);
        return x[i];
    }
};
    ...
    nuplet<int,4> A;
    A(1)=3;
    nuplet<string,2> B;
    B(1)="pierre";
    ...
```
</div>	



## Classes et template
### Il faut adapter nos fonctions
<div style="font-size: 80%">

```cpp []
template <typename T, int N>
T somme(nuplet<T,N> u) {
    T s=u(0);
    for (int i=1;i<N;i++)
        s+=u(i);
    return s;
}
    ...
    nuplet<double,3> C;
    ...
    cout << somme(C) << endl;
    ...
```
</div>	

<span class="fragment">

### <a style="color: #fb2c40">Attention</a>
Rien à avoir avec des tableaux de taille variables! 
</span>




## Mettre des template partout ? Non !

### A retenir
- Délicat à programmer
- Long à compiler 
- A utiliser que si vraiment nécessaire
- Le compilateur créé une nouvelle classe ou nouvelle fonction à chaque nouvelle valeur de type générique




## Standard Template Library
Les fonctions template sont délicats à programmer, mais pas à utiliser.

### C++ offre des fonctions et classes (STL)
Directement et facilement utilisable dans le code.



## Exemple avec min et max
```cpp []
int i=max(1,3);
double x=min(1.2,3.4);
```

### Erreur classique : mélanger les types
```cpp []
double resulat=max(1,2.3); // ne fonctionne pas
double resulat=max(1.,2.3); // Fonctionne
```



## Les complexes
```cpp []
#include <complex>
using namespace std;
    ...
    complex<double> z1(1.1,3.4),z2(1,0),z3;
    z3=z1+z2;
    cout << z3 << endl;
    double a=z3.real(),b=z3.imag();
    double m=abs(z3);  // module
    double th=arg(z3); // argument
```



## Les couples
```cpp []
pair<int,string> P(2,"hop");
P.first=3;
P.second="hop";
```



## Les listes
```cpp []
#include <list>
using namespace std;
    ...
    list<int> l;     // l=[]
    l.push_front(2); // l=[2]
    l.push_front(3); // l=[3,2]
    l.push_back(4);  // l=[3,2,4]
    l.push_front(5); // l=[5,3,2,4]
    l.push_front(2); // l=[2,5,3,2,4]
```



## Les vecteurs
<div style="font-size: 85%">

```cpp []
#include<vector>
#include<iostream>
using namespace std;

int main()
{
	// initialisation d'un vecteur
	std::vector<int> v1 = {7, 5, 16, 8};
	
	// Déclaration d'un vecteur d'entiers de taille non connue
	vector<int> v2;
	
	// Ajout de trois elements
	v2.push_back(4);
	v2.push_back(2);
	v2.push_back(5);
	
	// La méthode size précise le nombre d'entrée courante
	for(size_t i=0; i < v2.size(); i++)
		cout << i << " " << v2[i] << endl;
	}
	return 0;
```
</div>




## Aussi dans la STL
<div style="font-size: 95%">

- Les piles (stack) (Last In First Out).
- Les files (queue) (First In First Out).
- Les ensembles (set) (pas deux fois le même élément).
- Les tas (heap) (arbres binaires de recherche).
- Les tables (map) (table de correspondance clé/valeur).
- Et quelques autres encore...
</div>




## Valeur conditionnelle
```cpp
(test)?val1:val2
```
vaut "val1" si "test" est vrai et "val2" sinon.

### Exemple d'utilisation
```cpp
if (x>y)
   maxi=x;
else
   maxi=y;
   
// peut être remplacé par:
maxi=(x>y)?x:y;
```

Il ne faut pas abuser de cette construction sous peine de programme illisible!




## Page du cours
http://imagine.enpc.fr/~monasse/Info/

### Fiche de référence du cours
Poly : <a style="color: #fb2c40">page 187</a>
