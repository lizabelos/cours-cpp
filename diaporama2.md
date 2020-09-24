# Introduction au C++
## Cours n°2 <div style="font-size:50%;">(chap 3 du poly)</div>
### Mathis Petrovich



## Les variables
Les <a style="color: #2c40fb">**variables**</a> sont des *mémoires* dans lequelles sont stockées des *valeurs*.

### Une variable est caractérisée par
- Son nom (ou identificateur)
- Son type (entier, flotant, caractère, etc)
- Sa valeur




### Syntaxe
```cpp [1|2|3-6|7-8|9-10|11]
int i; // Définition (valeur inconnue)
i=2;   // Affectation
int j;
j=i;  // Affecte le valeur de i dans j
i=1;   // Ne modifie que i, pas j!
cout << i << " " << j << " "; // Affiche "1 2"
int k,l,m; // Définition multiple
k=l=3;     // Affectation multiple
int n=5; // Variable initialisée
int a=n,b=INT_MAX; // Initialisations multiple
const int s=12; // Variable constante
```



### Erreurs courantes
```cpp [1|2-3]
int q=r=4; // Erreur!
const int s=12;
s=13; // Erreur!
```



### La <a style="color: #2c40fb">portée</a> des variables (le *scope*)
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



### Le <a style="color: #2c40fb">type</a> des variables
```cpp [1|2|3|4|5]
int i=3;           // Entier relatif
double x=12.3;     // Nombre réel (double précision)
char c='A';        // Caractère
string s="hop";    // Chaîne de caractères
bool t=true;       // Booléen (vrai ou faux) 	
```



### Quelques notion de mémoire

- 1 <a style="color: #2c40fb">octet</a> = 8 <a style="color: #fb2c40">bits</a>
- 1 <a style="color: #fb2c40">bit</a> vaut <a style="color: #40fb2c">0</a> ou <a style="color: #40fb2c">1</a>.

#### ```int```: souvent stockées sur 4 <a style="color: #2c40fb">octets</a>:

- 32 <a style="color: #fb2c40">bits</a>
- 2^32=4294967296 valeurs possibles
- Entier relatif: −2147483648 à 2147483647




### Type supplémentaires
```cpp [1|2|3|4|5]
float y=1.2f;           // Nombre réel simple précision
unsigned int j=4;       // Entier naturel
signed char d=-128;     // Entier relatif un octet
unsigned char d=254;    // Entier naturel un octet
complex<double> z(2,3); // Nombre complexe
```



### Operations arithmétiques
#### Operations usuelles
<a style="color: #2c40fb">```+```</a>,<a style="color: #2c40fb">```-```</a>,<a style="color: #2c40fb">```*```</a>,<a style="color: #2c40fb">```/```</a>,<a style="color: #2c40fb">```%```</a>

#### Raccourci
```cpp []
int i=0; 
i+=5; // Equivalent à i=i+5
i-=3; // Equivalent à i=i-3
i*=2; // Equivalent à i=i*2
i/=4; // Equivalent à i=i/4
i%=3; // Equivalent à i=i%3
```



### Attention au divisions !
```cpp [1-3|5-7]
double x;
x = 1 / 3; // Ici x = 0.0
x = 1.0 / 3; // Ici x = 0.33333...

int y = 1;
x = y / 3; // Ici x = 0.0
x = double(y) / 3; // Ici x = 0.33333...
```



### Operations arithmétiques
#### Pre/post-incrément
```cpp [1-3|5-8|10-11]
int i=0;
i++; // Equivalent à i=i+1 ou i+=1
i--; // Equivalent à i=i-1 ou i-=1

int j;
i=1;
j=i++; // post-incrément, équivalent à j=i puis i++
cout << j << ',' << i << endl; // affiche 1,2

j=++i; // pre-incrément , équivalent à i++ puis j=i
cout << j << ',' << i << endl; // affiche 3,3
```



## Tests et conditions
Les tests servent à exécuter telle ou telle instruction en fonction de la valeur d'une ou de plusieurs variables. 

Ils sont toujours entre parenthèses. 
- Le "et" :  <a style="color: #2c40fb">```&&```</a>
- Le "ou" :  <a style="color: #2c40fb">```||```</a>
- La négation :  <a style="color: #2c40fb">```!```</a>
- L'égalité :  <a style="color: #2c40fb">```==```</a> (attention <a style="color: #fb2c40">**2**</a> signes <a style="color: #2c40fb">```=```</a>)
- La non-égalité :  <a style="color: #2c40fb">```!=```</a>
- Les inégalités :  <a style="color: #2c40fb">```>```</a>,<a style="color: #2c40fb"> ```>=```</a>,<a style="color: #2c40fb">```<```</a>,<a style="color: #2c40fb"> ```<=```</a>




### La condition if/else
#### Premier exemples
```cpp [1-2|4-7]
if (i==0) // i est-il nul?
	cout << "i est nul" << endl;
	
if (i>2)  // i est-il strictement plus grand que 2? 
	j=3;
else
	j=5;  // Si on est ici, c'est que i<=2
```



### La condition if/else
#### Exemple plus compliqué
```cpp []
if (i!=3 || (j==2 && k!=3) || !(i>j && i>k)) {
	// Ici, i est différent de 3 ou alors
	// j vaut 2 et k est différent de 3 ou alors
	// on n'a pas i plus grand a la fois de j et de k 
	cout << "Une première instruction" << endl;
	cout << "Une deuxième instruction" << endl;
    }
```



### Variable booléennes
#### Ou comment stocker le résultat d'un test
```cpp
bool t = ((i==3) || (j==4));
if (t)
	k=5;
```



### Switch
```cpp
char c = 'a'; // Mettez ce que vous voulez ici
switch (c) {
	case 'a':
		cout << "Vous avez tapé a !" << endl;
		break;
	case 'b':
		cout << "Vous avez tapé b !" << endl;
		break;
	case 'c':
	case 'd':
		cout << "Vous avez tapé c ou d!" << endl;
		break;
	default:
		cout << "Vous avez tapé une autre lettre" << endl;
}
```



## Les boucles
### ```while```
```cpp
int i = 0;
while (i <= 100) {
	cout << i << endl;
	i = i + 1;
}
```
### ```do..while```
```cpp
int i;
do {
	cout << "Un nombre entre 1 et 10 SVP : " << endl;
	cin >> i;
} while (i < 1 || i > 10);
```



## Les boucles ```for```
```cpp [1-4|6-8|10-12]
int i;
for (i = 1; i <=100; i=i+1) {
	cout << i << endl;
}

for (int i = 1; i <=100; i=i+1) { // Initialisation
	cout << i << endl;
}

for (int i = 1, j=100; j>i; i=i+2,j=j-3) { // Multiple
	cout << i << " " << j << endl;
}
```



## Les fonctions
Il faut regrouper  les passages identiques en fonctions:
- pour obtenir <a style="color: #2c40fb">un programme clair</a>
- et pour <a style="color: #2c40fb">moins se fatiguer!</a>

<a style="color: #fb2c40">Attention à bien comprendre quand faire une fonction: </a>
*Ne pas simplement découper un programme en petits morceaux sans aucune logique*



### Premier exemple
```cpp [1-3|5-10]
void afficherCoucou() {
	cout << "Coucou c'est moi !!" << endl;
}

int main() {
	for (int i = 0; i < 10; i++) {
		afficherCoucou();
	}
	return 0;
}
```



### Argument et retour
```cpp [1-4|6-12]
// Nombre entre 0 et n-1
int hasard(int n) {
	return rand() % n;
}

int main() {
	cout << "Génerer un nombre entre 0 et ";
	int max;
	cin >> max;
	cout << "Résultat : " << hasard(max) << endl;
	return 0;
}
```



### Argument et retour
```cpp [1-4|6-14]
// Nombre entre a et b
int hasard(int a, int b) {
	return a+(rand()%(b-a+1));
}

int main() {
	int min, max;
	cout << "Minimum : ";
	cin >> min;
	cout << "Maximum : ";
	cin >> max;
	cout << "Résultat : " << hasard(min, max) << endl;
	return 0;
}
```



### Surcharge
```cpp [1-9|11-15]
int hasard(int n) { // Nombre entre 0 et n-1
	return rand() % n;
}
int hasard(int a, int b) { // Nombre entre a et b
	return a+(rand()%(b-a+1));
}
double hasard() { // Nombre entre 0 et 1
	return rand() / double(RAND_MAX)
}

int main() {
	int i = hasard(3); // Entre 0 et 2
	int j = hasard(2, 4); // Entre 2 et 4
	double k = hasard(); // Entre 0 et 1
}
```



### Passage par valeur
```cpp [1-5|]
int echanger(int a, int b) {
	int c = a;
	a = b;
	b = c;
}

int main() {
	int a = 5;
	int b = 10;
	echanger(a, b);
	// Ici a = 5 et b = 10
}
```



### Passage par référence
```cpp [1-5|]
int echanger(int &a, int &b) {
	int c = a;
	a = b;
	b = c;
}

int main() {
	int a = 5;
	int b = 10;
	echanger(a, b);
	// Ici a = 10 et b = 5
}
```



### Passage par référence
Utile aussi pour faire des fonctions retournant plusieurs valeurs à la fois
```cpp
void un_point(int &x, int &y) {
	x = ...;
	y = ...;
}

int main() {
	int a, b;
	un_point(a, b);
}
```



### Portée, déclaration, définition
```cpp
void f() {
	g(); // Erreur: g() inconnue
}

void g() {
	f();
}
```



### Portée, déclaration, définition
```cpp
void g(); // Déclaration de g

void f() {
	g(); // OK: fonction déclarée
}

void g() { // Définition de g
	f();
}
```



### Variables locales
Les variables d’une fonction sont inconnues en dehors de la fonction
```cpp
void f() {
	int x;
	x = 3;
}

void g() {
	int y;
	y = x; // Erreur : x inconnu
}
```



### Variables globales
#### A éviter au maximum !
```cpp
int x; // globale

void f() {
	x = 3;
}

void g() {
	int y; // locale
	y = x; // OK : x est globale !
}
```




## Page du cours
http://imagine.enpc.fr/~monasse/Info/

### Fiche de référence du cours
Poly : <a style="color: #fb2c40">page 52</a>
