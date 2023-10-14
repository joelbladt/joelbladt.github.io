---
title: "Schnelles Löschen mehrerer Git-Branches"
titleImage: "./github-octocat.jpg"
date: 2023-08-22T14:17:21+02:00
draft: false
toc: false
images:
tags:
  - Git
author: "Joel Bladt"
---

Als leidenschaftlicher Entwickler habe ich stets nach Wegen gesucht, meinen Arbeitsablauf zu optimieren. Eines der größten Hindernisse, denen ich dabei begegnet bin, war die wachsende Anzahl von Git-Branches. Jeder neue Feature-Branch, jeder Bugfix-Branch und jede Experimentierphase hinterlassen ihre Spuren im Repository. Das führte oft zu Unordnung, Verwirrung und einem insgesamt unproduktiven Arbeitsumfeld.

Doch dann stieß ich auf eine leistungsstarke Methode, die mein Git-Management revolutioniert hat: das gleichzeitige Entfernen mehrerer Git-Branches auf meinem lokalen System. Die Idee, nicht mehr jeden Branch einzeln und mühsam zu löschen, sondern eine effiziente Methode zu finden, um klaren Tisch zu machen, begeisterte mich sofort.

In diesem Artikel möchte ich meine Erfahrungen und Erkenntnisse teilen. Ich werde dir zeigen, wie ich es schaffe, mehrere Branches auf einmal zu entfernen, ohne mich durch einen langwierigen Prozess zu quälen. Diese Methode hat nicht nur mein Repository aufgeräumt, sondern auch meine Arbeitsweise und Konzentration enorm verbessert.

## Ordnung schaffen: Entfernen toter Remote-Branches

Das Entfernen nicht mehr existierender Git-Branches ist besonders in Teamumgebungen von entscheidender Bedeutung, um Klarheit und Effizienz im Repository zu bewahren. Veraltete Referenzen können den Workflow behindern. Der Befehl `git fetch --prune` oder `git remote prune` beseitigt diese alten Referenzen und aktualisiert gleichzeitig die lokale Referenzliste, um einen reibungslosen Arbeitsprozess zu gewährleisten.


## Der wichtige Unterschied von git prune zu git fetch --prune

Während sich `git fetch --prune` darauf bezieht, Verweise auf nicht mehr vorhandene Remote-Branches zu löschen ist `git prune` ein leistungsstarkes Werkzeug um dein Git-Repository zu optimieren. Es konzentriert sich darauf, lokal erstellte, nicht gepushte Commits zu löschen. Diese Funktion ist äußerst hilfreich, um deinen Arbeitsbereich von ungenutzten Änderungen sauber zu halten.

## Effizientes Löschen mehrerer lokaler Branches

Das manuelle Löschen von Branches kann schnell mühsam werden. Als Entwickler möchten wir sich wiederholende Aufgaben, wo immer möglich, vermeiden und stattdessen Automatisierungen nutzen. Zum Glück können wir genau das erreichen, indem wir die Ausgabe eines Befehls in einen anderen leiten.

Für das gleichzeitige Löschen mehrerer zusammengeführter lokaler Branches bietet sich folgender Ansatz an:

```sh
git branch --merged | egrep -v "(^\*|main|gh-pages)" | xargs git branch -d
```

> Der Pipe (|) in dem Befehl dient dazu, die Ausgabe eines Befehls als Eingabe an den nächsten Befehl weiterzuleiten.
> Es ermöglicht die Verknüpfung von mehreren Befehlen, wobei die Ausgabe des vorherigen Befehls als Eingabe für den nächsten Befehl fungiert. Das bedeutet mit dem obengenannten Befehl wird folgendes gemacht:
> | | |
> | -------- | -------- |
> | **git branch --merged**     | Dieser Befehl listet die zusammengeführten Branches auf. Alternativ können mit der Angabe eines bestimmten Branches nach --merged alle Branches gelöscht werden, die bereits in den genannten Branch zusammengeführt wurden.     |
> | **egrep -v "(^\*\|main\|gh-pages)"**     | Hierbei wird die Liste von Branches gefiltert, um diejenigen auszuschließen, die sich nicht zum Löschen eignen, wie der aktuelle Branch oder spezielle Haupt-Branches.     |
> | **xargs git branch -d**     | Hier wird der Löschvorgang für jeden verbleibenden Branch in der Liste automatisiert.     |

Diese Methode ermöglicht es, den Prozess zu beschleunigen und gleichzeitig den Arbeitsbereich aufgeräumt zu halten.

### Hinweis

Wenn du deinen Arbeitsbereich gründlich aufräumen und nicht zusammengeführte Branches löschen möchtest, ändere --merged in --no-merged und ändere das kleine -d in ein großes -D.

**Löschen nicht zusammengeführter Branches**

```sh
# GEFAHR! Führe diesen Vorgang nur aus, wenn du sicher bist, dass du nicht gemergte Branches löschen willst.

# Alle lokalen nicht gemergten Branches löschen
git branch --no-merged | egrep -v "(^\*|main|gh-pages)" | xargs git branch -D

# Alle lokalen Zweige löschen.
git branch | egrep -v "(^\*|main|gh-pages)" | xargs git branch -D
```

Ich bedanke mich für dein Interesse beim Lesen dieses Artikels. Bei Fragen oder Anregungen stehe ich gerne zur Verfügung. Hinterlassen Sie gerne einen Kommentar – ich freue mich auf Ihre Rückmeldungen!

###### Weiterführende Quellen
https://www.atlassian.com/git/tutorials/git-prune<br />
https://nickymeuleman.netlify.app/blog/delete-git-branches<br />
https://stackoverflow.com/questions/226976/how-can-i-know-if-a-branch-has-been-already-merged-into-master<br />
https://www.atlassian.com/git/tutorials/git-prune<br />
https://nickymeuleman.netlify.app/blog/delete-git-branches<br />
https://stackoverflow.com/questions/226976/how-can-i-know-if-a-branch-has-been-already-merged-into-master
