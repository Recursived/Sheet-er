# Tests unitaires DRF


## Pourquoi tester ?

La mise en place de tests unitaires permet à l'application d'être plus robuste en évitant les régressions éventuelles au cours du développement. Il est donc obligatoire d'écrire des tests unitaires pour chaque API. 

L'objectif à long terme de ces tests est de construire un processus automatique d'intégration continu et de déploiement continu (à l'aide d'un serveur Jenkins).

Ainsi, la seule tâche à laquelle il faudra se soucier et le développement.



## Comment tester sous DRF ?

Les tests unitaires fait pour les API REST suivent les recommendations [Django](https://docs.djangoproject.com/fr/3.1/topics/testing/overview/) et [Django Rest Framework](https://www.django-rest-framework.org/api-guide/testing/).

Vos tests se trouveront dans chaque sous projets dans un fichier nommé *test.py*





