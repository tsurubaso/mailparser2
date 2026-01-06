
---


# Pipeline Mail + PostgreSQL (Next.js / Docker)

## Objectif
Mettre en place un système capable de :
- lire des emails via POP3
- parser correctement leur contenu (UTF-8, base64, multipart)
- stocker les emails dans une base PostgreSQL
- sans supprimer les mails du serveur
- avec une base créée en un clic

---

## 1. Lecture des emails (POP3)

- Protocole utilisé : POP3
- Authentification : USER / PASS
- Aucune suppression (`DELE` jamais utilisé)
- Récupération via `LIST` puis `RETR n`
- Limitation volontaire du nombre de mails lus pour les tests

Le flux POP3 brut est récupéré tel quel (RFC822).

---

## 2. Parsing des emails

Librairie utilisée :
- `mailparser`

Fonctionnement :
- décodage automatique du `Content-Transfer-Encoding` (base64, quoted-printable)
- gestion des encodages (UTF-8, japonais, etc.)
- gestion des multipart
- extraction du texte lisible

Résultat exploitable :
- subject
- from
- to
- date
- text (contenu décodé)
- html (si présent)

Aucun affichage du raw POP3 après désactivation du mode debug du client.

---

## 3. Base de données

Choix :
- PostgreSQL (préféré à MySQL)

Objectifs :
- persistance des mails
- stockage structuré
- préparation à l’analyse automatique

---

## 4. Création de la base en un clic (Docker)

Commande PowerShell :

```powershell
docker run -d --name mail-db -e POSTGRES_USER=mailuser -e POSTGRES_PASSWORD=mailpass -e POSTGRES_DB=maildb -p 5432:5432 -v maildata:/var/lib/postgresql/data postgres:16
```

Résultat :

* PostgreSQL 16 lancé
* base `maildb` créée
* utilisateur prêt
* données persistantes via volume Docker

---

## 5. Connexion à PostgreSQL

Accès via Docker :

```powershell
docker exec -it mail-db psql -U mailuser -d maildb

```

Prompt attendu :

```
maildb=#
```


## 6. Schéma de base minimal

```sql
CREATE TABLE emails (
  id SERIAL PRIMARY KEY,
  message_uid TEXT UNIQUE,
  subject TEXT,
  sender TEXT,
  received_at TIMESTAMP,
  body TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Objectif :

* éviter les doublons
* stocker le contenu analysable
* base prête pour indexation et règles métier

---

## 7. Cycle de vie du container

Quitter psql :

```sql
\q
```

Arrêter la base :

```powershell
docker stop mail-db
```

Redémarrer la base :

```powershell
docker start mail-db
```

Les données sont conservées tant que le volume existe.

---

## État final

* POP3 fonctionnel
* parsing propre et lisible
* base PostgreSQL opérationnelle
* environnement isolé et reproductible
* prêt pour analyse automatique des emails


