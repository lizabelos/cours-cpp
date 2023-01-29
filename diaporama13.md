# Algorithmique et Structure de Données
## Cours 1
### Liza Belos



## Algorithmique Quadratique
```cpp
for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        if (tab[j] > tab[j+1]) {
            int tmp = tab[j];
            tab[j] = tab[j+1];
            tab[j+1] = tmp;
        }
    }
}
```



## Algorithmique Quadratique V2
```cpp
for (int i = 0; i < N; i++) {
    for (int j = 0; j + i + 1 < N; j++) {
        if (tab[j] < tab[i]) {
            int tmp = tab[j];
            tab[j] = tab[i];
            tab[i] = tmp;
        }
    }
}
```



## QuickSort
### Diviser pour régner
1. Choisir un élément du tableau
2. Déplacer tous les éléments plus petits que le pivot à gauche du pivot
3. Déplacer tous les éléments plus grands que le pivot à droite du pivot
4. Le pivot est maintenant à sa place finale
5. Répéter l'opération sur les sous-tableaux à gauche et à droite du pivot


## QuickSort
### 0. Initialisation
| 52 | 22 | 78 | 12 | 45 | 34 | 67 | 90 | 11 | 23 |
|----|----|----|----|----|----|----|----|----|----|


## QuickSort
### 1. Choix du pivot
| <span style="color: red">52</span> | 22 | 78 | 12 | 45 | 34 | 67 | 90 | 11 | 23 |
|------------------------------------|----|----|----|----|----|----|----|----|----|


## QuickSort
### 2. Déplacement des éléments
| 22 | 12 | 45 | 34 | 11 | 23 | <span style="color: red">52</span> | 78 | 67 | 90 |
|----|----|----|----|----|----|------------------------------------|----|----|----|
Les éléments plus petits que le pivot sont à gauche du pivot ; 
Les éléments plus grands que le pivot sont à droite du pivot


## QuickSort
### 3. Diviser le tableau en deux
| 22 | 12 | 45 | 34 | 11 | 23 |
|----|----|----|----|----|----|

Pivot : 52

| 78 | 67 | 90 |
|----|----|----|


## QuickSort
### 4. Répéter l'opération sur les sous-tableaux
| 11 | 12 | 22 | 23 | 34 | 45 |
|----|----|----|----|----|----|

Pivot : 52

| 67 | 78 | 90 |
|----|----|----|


## QuickSort
### 5. Fusionner les deux sous-tableaux
| 11 | 12 | 22 | 23 | 34 | 45 | 52 | 67 | 78 | 90 |
|----|----|----|----|----|----|----|----|----|----|



## QuickSort
### Complexité dans le pire des cas
$C_n = (N - 1) + C_{n-1}$
$C_n = (N - 1) + (N - 2) + ... + 1 = O(N^2)$
### Complexité dans le meilleur des cas
$C_n = \frac{N}{2} + C_{\frac{n}{2}}$
$C_n = \frac{N}{2} + \frac{N}{4} + ... + 1 = O(N \log N)$



## HeapSort
### Les files de priorité

(Chapitre 4)
 - Accès à l'élément le plus prioritaire en temps constant : $O(1)$
 - Ajout d'un élément en temps logarithmique : $O(\log N)$
 - Suppression de l'élément le plus prioritaire en temps logarithmique : $O(\log N)$



## Dichotomie
```cpp
int dichotomie(int tab[], int N, int x) {
    int g = 0;
    int d = N - 1;
    while (g <= d) {
        int m = (g + d) / 2;
        if (tab[m] == x) {
            return m;
        } else if (tab[m] < x) {
            g = m + 1;
        } else {
            d = m - 1;
        }
    }
    return -1;
}
```