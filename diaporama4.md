# Introduction au C++
## Cours n°4 <div style="font-size:50%;">(chap 5 du poly)</div>
### Mathis Petrovich



## Révisions
## Erreurs classiques
```cpp [1|3|5]
if (i=2) // Mettre un seul = dans les tests if

if (i==2) // Oublier les parenthèses

if (i==2) then // Utiliser then
```



## Erreurs classiques
```cpp [1-2|4-7|9-10]
// Mettre des virgules dans un for
for (int i = 0, i < 100, i++)

// Oublier les parenthèses
// quand on appelle une fonction sans paramètre
int f() {...}
int i=f;

int s[4]={1,2,3,4}, t[4];
t=s; // Vouloir affecter un tableau à un autre
```



## Erreurs classiques
```cpp
void set(int t[5]) {...}
int s[5];
set(int s[5]); // Ceci ne veux rien dire
set(s); // C'est mieux !
```



## Erreurs originales
#### Penser "formule mathématique"
```cpp
if (for (int i=0;i<n;i++) ok(i))
	...
```
#### Alors qu'il faut faire
```cpp
bool allok=true;
for (int i=0;i<n;i++)
	allok=(allok && ok(i));
if (allok)
	...
```



## Erreurs originales
#### Encore une meilleure façon de faire
```cpp
bool allok=true;
for (int i=0;i<n && allok;i++)
	allok=(allok && ok(i));
if (allok)
	...
```
### Simplifiable en
```cpp
bool allok=true;
for (int i=0;i<n && allok;i++)
	allok=ok(i);
if (allok)
	...
```



## Conseils
- <a style="color: #fb2c40">**Indenter**</a>! (sinon vous perdez des points..)
- Cliquer sur les messages d’erreurs et de warnings pour aller directement à la bonne ligne
- Utiliser QtCreator



## Problèmes dans vos TPs
- Envoyer que le .cpp (il faut envoyer un zip avec toutes les sources !)
- Projet qui ne compile pas
- Indentation
- Variables globales
- Pas de fonction main



## Les structures
Creation d'un nouveau <a style="color: #2c40fb">type</a> qui va regrouper plusieurs variables pour les manipuler comme une seule.



## Syntaxe avec un exemple
### Une structure "Point"
```cpp
struct Point {
    double x, y;
};
```

### Attention! 
Ne pas oublier le <a style="color: #fb2c40">point virgule</a> après l’accolade qui ferme la définition de la structure!




## Vocabulaire
Les "sous-variables" x et y sont appelées **champs**.
```cpp
struct Point {
    double x, y;
};

int main() {
	Point a;
	a.x = 2.3;
	a.y = 3.4;
}
```



## Une structure "Cercle"
```cpp
struct Cercle {
    Point centre;
    double rayon;
    Color couleur;
};
...
Cercle C; // Notre cercle s'appelle C ici.
C.centre.x = 3.0; 
C.centre.y = 4.5;
C.rayon = 10.4;
C.couleur = Red;
```



### Cas d'utilisation
- Regrouper des variables <a style="color: #fb2c40">logiquement</a> liées
- Regrouper des paramètres de fonctions



## Utilisation
Comportement <a style="color: #2c40fb">similaire</a> aux types de base :
- Définition 
- Affectation
- Initialisation
- Passage en paramètre
- Retour d’une fonction



## Utilisation
```cpp
Point a={2.3,3.4},b=a,c;     // Initialisations
c=a;                         // Affectations
Cercle C={{12,13},10.4,Red}; // Initialisation
```

### <a style="color: #fb2c40">Attention</a>
```cpp
a = b; // Fonctionne
a = {2.3, 3.4}; // Ne fonctionne pas
```



## Passage par valeur/référence
### Comme un type de base
```cpp [1-4|6-9]
// Passage par valeur
double distance(Point a, Point b) {
   return sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

// Passage par référence
void agrandir(Cercle& C, double echelle) { 
   C.rayon=C.rayon*echelle; // Modifie le rayon
}
```



## Autres usages possibles
#### Type de retour de fonction
```cpp []
Point milieu(Point a, Point b) {
   Point M;
   M.x=(a.x+b.x)/2;
   M.y=(a.y+b.y)/2;
   return M;
}
```

#### Tableau de structures
```cpp []
Point P[10];
for (int i=0;i<10;i++) {
    P[i].x=i;
    P[i].y=f(i);
}
```



### Structure avec des champs tableaux
```cpp [1-4|6-11|13-14]
// Un début de jeu de Yam's
struct Tirage { // 
    int de[5];  // champ de type tableau
};

Tirage lancer() {
    Tirage t;
    for (int i=0;i<5;i++)
        t.de[i]=1+rand()%6; // Un dé de 1 à 6
    return t;
}

Tirage t;
t=lancer();
```



## Page du cours
http://imagine.enpc.fr/~monasse/Info/

### Fiche de référence du cours
Poly : <a style="color: #fb2c40">page 76</a>
