# Introduction au C++
## Cours n°3 <div style="font-size:50%;">(chap 4 du poly)</div>
### [name]
#### Slides par  Mathis Petrovich et Liza Belos



## Les tableaux
### Pourquoi en a-t-on besoin?
```cpp [1-4|6-9]
int x1, y1, u1, v1; // Balle 1
int x2, y2, u2, v2; // Balle 2
int x3, y3, u3, v3; // Balle 3
int x4, y4, u4, v4; // Balle 4

BougeBalle(x1, y1, u1, v1);
BougeBalle(x2, y2, u2, v2);
BougeBalle(x3, y3, u3, v3);
BougeBalle(x4, y4, u4, v4);
```



## Les tableaux
### Premier exemple
```cpp [1|3-4]
int x[4], y[4], u[4], v[4]; // Balles

for (int i=0; i<4; i++)
	BougeBalle(x[i], y[i], u[i], v[i]);
```



## Utilisations
- Utiliser quand on peut "regrouper" les variables de manière sensé
- Moins fatiguant à écrire (+1000 balles..)
- Plus simple à maintenir le code
- Plus clair



## Syntaxe
### Définition
```cpp
// Déclare un tableau de type double de taille 4
double montableau[4];
```

### Affectation **(de 0 à n-1)**
```cpp
// Assigne à la 1ère case de mon tableau la valeur 8.6;
montableau[0] = 8.6;
// Assigne à la 3ème case mon tableau la valeur 3.4
montableau[2] = 3.4;
```
Une des <a style="color: #fb2c40">erreurs</a> les plus fréquentes en C++
```cpp
montableau[4] = 2.0;
```



## Cas pratique
### Stocker l'addition de deux tableaux
```cpp [1|3|5-6]
double x[100], y[100], z[100];

... // ici x[i] et y[i] prennent des valeurs

for (int i=0; i<100; i++)
	z[i] = x[i] + y[i]
```



## Taille d'un tableau
La taille d'un tableau doit être <a style="color: #fb2c40">fixe</a> et <a style="color: #fb2c40">connue</a> à la compilation !

```cpp [1|3,4|6,7,8]
double x[10]; // OK

const int n=5;
int tab[n]; // OK

int n2;
n2 = 10;
int tab2[n2]; // ERREUR!
```



## Initialisation
```cpp
int t[4] = {1, 2, 3, 4};
string s[2] = {"hip", "hop"};	
```

#### Attention : pas pour une affectation
```cpp
int t[2];
t = {1, 2}; // Erreur !
```
Il faut les traiter un par un
```cpp
t[0] = 1;
t[1] = 2;
```



## Tableaux et fonctions
```cpp [1-5|7-11]
void affiche(int s[4]) {
	for (int i = 0; i < 4; i++) {
		cout << s[i] << endl;
	}
}

int main() {
	int t[4] = {1, 2, 3, 4};
	affiche(t);
	return 0;
}
```



### Un tableau est **toujours** passé par référence
```cpp [1-4|6-11]
// Rappel: c'est ceci qui marche
void affectation(int &x, int val) {
	x = val;
}

// Une fonctione qui marche sans '&'
void remplit(int s[4], int val) {
	for (int i = 0; i < 4; i++) {
		s[i] = val;
	}
}
```



### Une fonction <a style="color: #fb2c40">ne peut pas</a> retourner un tableau en C++
- Par conception
- Pour des soucis d'efficacité 
- En pratique : passage par référence

```cpp []
void somme(const int x[4], const int y[4], int z[4]) {
	for (int i=0; i<4; i++)
		z[i] = x[i] + y[i]
}
```



## Argument de tableau à taille variable
```cpp
// Preciser en argument la taille du tableau
void remplit(int s[], int n, int val) {
	for (int i = 0; i < n; i++) {
		s[i] = val;
	}
}
```



## Page du cours
http://imagine.enpc.fr/~monasse/Info/

### Fiche de référence du cours
Poly : <a style="color: #fb2c40">page 69</a>
