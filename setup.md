
# Comment construire le projet
___________

## Sommaire

- [Comment construire le projet](#comment-construire-le-projet)
  - [Sommaire](#sommaire)
  - [1. Avant-propos](#1-avant-propos)
  - [2. Structure du projet avec Docker/Compose et fonctionnement](#2-structure-du-projet-avec-dockercompose-et-fonctionnement)
  - [3. Construction du projet](#3-construction-du-projet)
  - [4. Env de développement python](#4-env-de-développement-python)

___________

## 1. Avant-propos

Avant de commencer, il est préférable d'être sous un environnement Linux. 
Pour clarifier toute ambiguïté, la démonstration de l'installation se fait sous un environnement Linux (*POP OS* basée sur *Ubuntu*). Par conséquent, toutes les commandes qui vont être fournies sont des commandes Shell.

Il faudra par la suite installer [Docker](https://docs.docker.com/engine/install/ubuntu/) sur votre machine. Il suffit de copier les commandes présentes sur le lien. De la même manière, [docker-compose](https://docs.docker.com/compose/install/) doit être sur votre machine.

Vous pouvez également installer ces différents outils facilitant grandement l'utilisation de **Docker** et **docker-compose** :

- *Visual Studio Code* : extensions Docker et docker-compose
- *Dockstation* : permet de visualiser les conteneurs présents sur votre machine

## 2. Structure du projet avec Docker/Compose et fonctionnement

Ce projet s'appuie sur ces technologies afin de permettre de constuire automatiquement les environnements techniques nécéssaires au bon fonctionnement des éléments de Sheet-er.

À la racine du projet, on retrouve un fichier nommé **docker-compose.yml**. Ce fichier s'appuie sur plusieurs **Dockerfile**. 

Les **Dockerfiles** sont des blocs élémentaires qui doivent se retrouver dans chaque sous projet (i.e sheetAPI, sheeter_user_interface...). Ils permettent de générer l'environnement minimum permettant au sous-projet de fonctionner.

On dit souvent :
> Un exemple vaut mieux que mille mots

Détaillons alors le fichier **Dockerfile** présent dans le dossier  */sheetAPI*

```Dockerfile 
FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY . .
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```
_________
Le bout de code ci-dessous permet de prendre une image minimaliste de Linux avec une installation python3.8 ([+ d'infos sur l'image](https://hub.docker.com/_/python)). La deuxième permet de mettre en place une variable d'environnement nommée *PYTHONUNBUFFERED* ayant pour valeur 1.

```Dockerfile 
FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1
```
__________
La première ligne permet de définir le dossier sur lequel on souhaite travailler. Par conséquent, les commandes `RUN , CMD , ADD , COPY , ENTRYPOINT` utiliseront le dossier spécifié par la commande `WORKDIR`.

La deuxième commande `COPY <src> … <dest>` copie :O le contenu du dossier dans lequel se trouve le *Dockerfile* dans le dossier du conteneur nommé */code*.

La dernière ligne est une ligne qui participe à la construction du conteneur (ici on installe les modules Python) : `RUN <my_command>` ou `RUN ["executable", "param1", "param2"]`

```Dockerfile 
WORKDIR /code

COPY . .
RUN pip install -r requirements.txt
```
________

La première ligne permet d'exposer le port 8000 du conteneur (port que l'on utilise juste en dessous) afin que le conteneur puisse communiquer avec les autres conteneurs.
La dernière ligne est similaire à la commande `RUN` à la seule différence que `CMD` n'est interprétée que lorsque le conteneur est construit ([voir subtilité](https://stackoverflow.com/questions/37461868/difference-between-run-and-cmd-in-a-dockerfile)).

```Dockerfile
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## 3. Construction du projet

![Tutorial visuel](https://media.giphy.com/media/LmZjeEIdMM8zEdy7Zj/giphy.gif)

Il est possible d'utiliser [les outils](#1-avant-propos) Visual Studio Code pour construire le projet grâce à *docker-compose*. Pour ce faire, il faut ouvrir la palette des commandes `Ctrl+Shift+p` et lancer la commande : **Docker compose up**.

Il y a des chances que vous rencontriez une erreur concernant un port bloqué. Dans ce cas là, il faut fermer le processus/service qui utilise ce port et relancer la commande.

Si vous n'êtes pas sous VS code, la commande permettant de construire le projet est la suivante : `docker-compose  up -d --build` (:warning: Elle doit être lancée à la racine du projet :warning:).

Pour s'assurer du bon déroulement de l'étape, vous pouvez utiliser *Dockstation* ou *l'extension Docker*.

Ci-dessous une démonstration de l'interface *Dockstation* :

![Dockstation](https://media.giphy.com/media/kcH4m6OW3KO5KsmsOv/giphy.gif)
____________

## 4. Env de développement python

Les *API REST* sont fait en python à l'aide de [Django Rest Framework](https://www.django-rest-framework.org/). Ces API utilisent une quantité importante de modules Python. Il est donc nécessaire de les installer lorsque vous êtes en train de développer l'application sur votre poste personnel. Tout d'abord, vous devez installer le langage [Python](https://www.python.org/) sous une version 3.7/3.8.

Pour éviter de polluer votre poste avec une quantité inombrable de modules, il faut pouvoir créer des environnements virtuels python à l'aide de [venv](https://docs.python.org/3.7/tutorial/venv.html). 

Après activation de votre environnement virtuel, il suffit d'installer les modules python à l'aide de l'une des commandes :
- `pip install -r requirements.txt` 
- `pip3 install -r requirements.txt`

Les fichiers **requirements.txt** sont présents à la racine de chaque sous projet.