# Sheeter docs
*Documentation du projet Sheeter*
_____________
## Avant-propos

**Sheeter 'web' docs** est un serveur regroupant toutes les informations concernant le projet web Sheeter. Il a pour objectif de centraliser toutes les informations permettant de développer et maintenir l'application web. Les différents documents que vous trouverez sur le serveur seront soit en français, soit en anglais.

## Structure de la documentation

Dans le but de faciliter la lecture de la documentation, une structure a été mise en place. Les documents sont arrangés par type d'application, c'est à dire que le menu est découpé en type d'applications (ici backend, frontend). Ensuite, les documents sont groupés par sous-projet (sheetAPI, userAPI, react UI...). Enfin, il convient de grouper les documents par thème comme par exemple **Testing**, **CSS**, etc...

## Comment documenter ?

> Documenter, c'est partager son savoir

La documentation a un rôle important dans la compréhension du projet. Il est donc encouragé de documenter tout ce qui est non trivial. Pour ce faire, il faut suivre un processus assez simple.

Dans un premier temps, il faut installer [MkDocs](https://www.mkdocs.org/) sur votre poste. Une fois l'installation faite, vous pouvez procéder à l'écriture de votre document. Ce document devra être déposé dans le dossier adéquat (voir le dossier *docs* à la racine du projet). Ensuite, vous devez inscrire votre document dans le fichier **mkdocs.yml** se trouvant à la racine du projet. N'hésitez pas à suivre la syntaxe déjà présente dans le fichier.

On dénombre deux commandes importantes concernant la documentation:

- `mkdocs serve` qui permet de tester le site de documentation
- `mkdocs build` qui permet de générer le site statique de documentation

> **/!\\** Il est fortement conseillé de corriger les éventuelles fautes et erreurs que vous retrouvez dans les fichiers de documentation **/!\\**

