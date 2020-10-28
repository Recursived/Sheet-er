# Tests unitaires DRF

_________
## Pourquoi tester ?

La mise en place de tests unitaires permet à l'application d'être plus robuste en évitant les régressions éventuelles au cours du développement. Il est donc obligatoire d'écrire des tests unitaires pour chaque API. 

L'objectif à long terme de ces tests est de construire un processus automatique d'intégration continu et de déploiement continu (à l'aide d'un serveur Jenkins).

Ainsi, la seule tâche à laquelle il faudra se soucier et le développement.


________
## Comment tester sous DRF ?

Les tests unitaires faits pour les API REST suivent les recommendations [Django](https://docs.djangoproject.com/fr/3.1/topics/testing/overview/) et [Django Rest Framework](https://www.django-rest-framework.org/api-guide/testing/).

Vos tests se trouveront dans chaque sous projets dans un fichier nommé *test.py*

________
## Un exemple

Décrivons un fichier test pour comprendre comment fonctionne les tests unitaires

```python
class SheeterUserTest(APITestCase):
    def setUp(self):
        self.data = {
            'user_id': '12312321',
            'name': 'John Doe',
            'email': 'test@email.com',
            'profile_pic': 'https://github.com/',
            'account_type': 'Fb'
        }

    def test_can_create_user(self):
        response = self.client.post(reverse('sheeteruser-list'), self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
```

On remarque que le nom de la classe de test est assez particulier. En premier lieu, on met le nom du modèle/table sur lequel/laquelle on agit, c'est à dire *SheeterUser*. Enfin, on ajoute tout le temps le mot *Test* pour indiquer qu'il s'agit d'une classe de test.

On passe ensuite à la classe parent que l'on retrouve dans les parenthèses. Il en existe plusieurs mais ici, on utilise la classe *APITestCase* (voir [autres types](https://makina-corpus.com/blog/metier/2016/django-rest-framework-les-tests-partie-8)).
<br>
<br>
Les classes de test disposent tout le temps d'une méthode **setUp** qui permet de mettre en place les données sur lesquelles on veut agir. Dans cet exemple, on créé un utilisateur fictif avec toutes les informations nécéssaires à la création d'un **SheeterUser**.
<br>
<br>
Rentrons dans le vif du sujet avec la deuxième méthode de la classe. Elle effectue le test à l'aide d'utilitaires mis à disposition par **DRF**. La première ligne fait un appel *HTTP* POST qui, en terme d'API REST, permet de créer un enregistrement dans la base de donnée. Pour effectuer cet appel, il y a deux paramètres à connaître, **l'url** et les **données**. L'url est automatiquement recherchée grâce à cette fonction `reverse('sheeteruser-list')`. Mais où trouve-t-on **sheeteruser-list** ? Simple comme bonjour, la preuve en image :  

![Comment trouver le paramètre](https://media.giphy.com/media/48VOstyE6W0FRBaD70/giphy.gif)

Sur la deuxième ligne, on retrouve une méthode **assert**.
 > Assertion : proposition que l'on avance et que l'on soutient comme vraie.

Comme son nom l'indique, elle permet de vérifier la validité de la condition qu'on lui passe. Ici, il s'agit de vérifier une égalité. Cette dernière permet de voir si le code de retour de l'appel HTTP est le bon : `self.assertEqual(response.status_code, status.HTTP_201_CREATED)`.

Il va sans dire que l'on peut avoir autant de méthodes de test que l'on souhaite dans une classe. En revanche, la bonne pratique est de mise. Il faut tant bien que mal essayer de regrouper les mêmes fonctionnalités dans une même classe (voir sous-projet *userAPI*).

Une question vous vient peut-être à l'esprit. Où vont mes enregistrements lorsque les tests sont terminés. Par défaut, le lancement des tests DRF entraîne la création d'une **BDD de passage** qui est supprimée une fois les tests terminés. Cependant, il existe des options permettant d'outrepasser le fonctionnement de base.

_________
## Lancement des tests 

Ce n'est pas tout que d'écrire des tests, il faut ensuite les lancer :O. Comment faire ? C'est très simple, il suffit de lancer le fichier **manage.py** avec l'option test comme cela : `python manage.py test`.

Dans un premier, il convient de lancer le conteneur de l'API que vous souhaitez tester. Prenons par exemple l'api **userAPI**. Si le conteneur n'est pas construit, il vous suffit de le faire via la commande **build**. Il ne manque plus qu'à lancer le conteneur via la commande **start**. A présent, vous devez lancer un terminal intégré au conteneur (tâche simple via VS code et son extension Docker). Enfin, il ne manque plus qu'à s'assurer de se trouver dans le bon dossier, celui de l'API en question. Maintenant, lancez : `python manage.py test` ou `python3 manage.py test` 
_________
## DRF : le couteau suisse

Django Rest Framework met à disposition plusieurs outils permettant de tester ou de visualiser l'API. L'un des outils est une documentation automatique permettant de tester le bon fonctionnement des différentes méthodes **HTTP** mis en place. Pour atteindre cette interface, il vous suffit d'ajouter `/docs` à l'url racine de votre API (exemple : localhost:8000/docs)

Vous pouvez aussi accéder à la description **OPEN API** de ce que vous avez mis en place via l'url `/schema` (exemple : localhost:8000/schema)