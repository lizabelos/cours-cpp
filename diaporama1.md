# Introduction au C++
## Cours 1
<span class="myname"></span>
#### Slides par Mathis Petrovich et Liza Belos



## Langages de programmation
### Liste non exhaustive
<!-- .slide: class="narrow" -->
|Paradigme | Langage|
|--|--|
|Fonctionnel|<a style="color: #2c40fb">Ocaml </a>, F#, Haskell, Lisp, Perl, Ruby, Rust|
|Impératif| C, <a style="color: #40fb2c"> C++ </a>, F#, Fortran, Go, <a style="color: #2c40fb">Ocaml </a>, Pascal, Rust|
|Orienté objet| <a style="color: #fb2c40"> Python <a/>, <a style="color: #40fb2c">C++ </a>, C#, Dart, F#, Java, JavaScript, <a style="color: #2c40fb">Ocaml </a>, Perl, PHP, Rust, TypeScript, Swift|
|Scripts| <a style="color: #fb2c40"> Python </a>, Dart, Hack, Javascript, JRuby, Lua, Perl, PHP, Ruby, TypeScript|



## Langage interprété (ex Python)
### Interpréteur
```bash
>>> a = 1
>>> b = a + 2
>>> print(b)
3
```

### Exécution d'un script directement
```bash
$ python script.py
```



## Langage compilé
### Code C++
```cpp [|3-4]
int main ()
{
    int a=3, b;
    b = a + 2;
    return 0;
}
```

### Code compilé (langage machine)
```cpp [|3-6]
push   %rbp
mov    %rsp,%rbp
movl   $0x3,-0x8(%rbp)
mov    -0x8(%rbp),%eax
add    $0x2,%eax
mov    %eax,-0x4(%rbp)
mov    $0x0,%eax
pop    %rbp
retq
```



## Génération de l'executable
### 1) Compilation
fichier source → fichier objet

### 2) Link
- fichier objet
- autres fichiers objets
- bibliothèques

→ fichier exécutable




## Creation d'un projet C++
### Creation d'un fichier CMakeLists.txt
```cmake
PROJECT(NomDuProjet)
add_executable(NomDeLexecutable NomDuFichier.cpp)
```

### cmake
Utilisation de ce programme pour gérer la compilation/link



## Environnement de programmation QtCreator
### Tout en un!
- Editeur de texte
- Coloration syntaxique
- Compilateur/linker
- Debuggeur
- Gestionnaire de projet



## Noms des fichiers en C++
### Par extension (le suffixe)
- Fichier source : <a style="color: #fb2c40">.cpp</a>
- Fichier objet : <a style="color: #fb2c40">.obj</a> (Windows) ou <a style="color: #fb2c40">.o</a> (Linux/Mac)
- Fichier exécutable : <a style="color: #fb2c40">.exe</a> (Windows) ou sans extension (Linux/Mac)


## Noms des fichiers en C++
### Pour plus tard dans le cours
- Headers C++ : <a style="color: #fb2c40">.h</a>
- Les bibliothèques : <a style="color: #fb2c40">.lib</a> ou <a style="color: #fb2c40">.dll</a> (Windows) ou <a style="color: #fb2c40">.a</a> ou <a style="color: #fb2c40">.so</a> (Linux/Mac)



# Premier programme
## Hello World!

```cpp[|1|2|4-8|6]
#include <iostream>
using namespace std;

int main()
{
    cout << "Hello World!" << endl;
    return 0;
}
```



## Page du cours
http://imagine.enpc.fr/~monasse/Info/
