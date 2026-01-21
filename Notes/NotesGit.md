<!-- for visualisation Ctrl + Shift + V -->

# Git commands

## Effacer tous les changements locaux pour revenir au dernier push

```bash
git fetch origin
git reset --hard origin/main 
git clean -fd
```

## faire le grand menage, les autres trucs plus courts ne marchent pas

```bash
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
```

## HEAD détaché (detached HEAD)

Quand Git affiche `you are not currently on a branch`, cela signifie que tu es positionné directement sur un commit précis, et non sur une branche. Cela arrive typiquement après un `git checkout <hash>` ou un `git switch --detach <hash>`.

Ce n’est pas une erreur. Git prévient simplement que si tu fais des commits dans cet état sans créer de branche, ils peuvent devenir difficiles à retrouver.

## Créer une branche depuis un HEAD détaché

Pour conserver ton travail et repartir proprement, il suffit de créer une branche à partir de l’état courant.

Commande recommandée (Git récent) :

* `git switch -c nom-de-branche`

Commande équivalente (ancienne syntaxe) :

* `git checkout -b nom-de-branche`

Cela crée la branche et t’y place immédiatement.

## Vérifier ta position

Pour savoir sur quelle branche tu te trouves :

* `git branch`

L’astérisque indique la branche courante.

## Pousser la branche sur le remote

Une fois la branche créée localement, pour l’envoyer sur le dépôt distant :

* `git push -u origin nom-de-branche`

L’option `-u` définit le lien entre la branche locale et la branche distante pour les prochains `git push` / `git pull`.

## Point clé à retenir

Se déplacer sur un commit précis est sans danger tant que tu crées une branche avant de continuer à travailler. Créer une branche depuis un HEAD détaché est une pratique normale et saine dans Git.
