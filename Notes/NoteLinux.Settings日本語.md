<!-- 表示用：Ctrl + Shift + V -->

# Notes – Ubuntuサーバー初期セットアップ（Node / Docker / VS Code まで）

このノートは、**最初から現在の状態まで**に行った内容をまとめたものです。
「素の Ubuntu」の扱い、ネットワークの理解、ユーザー管理、Docker、Node.js、Visual Studio Code の導入まで、**開発準備が整うところ**までを整理しています。

---

## 1. 初期コンテキスト

* 会社用 PC に **Ubuntu**
* 会社用 PC と個人 PC は分離して使用

---

## 2. ネットワーク：現在の状態を理解する

### ネットワークインターフェースの確認

```
ip a
```

重要なポイント：

* `lo` → ループバック（127.0.0.1、10.255.255.255/32 → LAN では使用しない）
* `eth0` → 実際にネットワークにつながっているインターフェース

### デフォルトルートの確認

```
ip route
```

確認した例：

```
default via 172.21.0.1 dev eth0
172.21.0.0/20 dev eth0 src 172.21.10.16
```

➡️ このマシンは **企業ネットワークの内側**にあり、自宅ルーターから直接インターネットに公開されているわけではありません。

---

## 3. 接続テスト

### 別のマシンから ping

```
ping IP_UBUNTU
```

正常な結果：

* 送信パケット = 受信パケット
* レイテンシが低い（2〜4 ms）

➡️ Ubuntu マシンは **LAN 内からアクセス可能**

---

## 4. Ubuntu のユーザー管理

### 新しいユーザーを作成

```
sudo adduser newuser
```

作成時に聞かれる内容：

* パスワード
* フルネーム
* 部屋番号（オフィス番号、空でもOK）

### sudo 権限を付与

（管理者アカウントで実行）

```
sudo usermod -aG sudo newuser
```

確認：

```
groups newuser
```

---

## 5. `sudo` とは？

* `sudo` = **Super User DO**
* 管理者権限でコマンドを実行するための仕組み
* システムを誤操作から守るための安全装置

sudo 権限がない場合のエラー例：

```
newuser は sudoersファイルにありません
```

---

## 6. システムの更新

### パッケージ情報の更新

```
sudo apt update
```

### インストール済みソフトの更新

```
sudo apt upgrade
```

➡️ システムを安全に最新状態へ更新（設定は壊れない）

---

## 7. Docker：基本操作

### Docker が動いているか確認

```
docker --version
docker info
```

### 実行中のコンテナ一覧

```
docker ps
```

### 停止中も含めた全コンテナ

```
docker ps -a
```

### Docker イメージ一覧

```
docker images
```

---

## 8. Image と Container の違い

* **Image** = ひな形（不変のテンプレート）
* **Container** = Image から起動した実体

例え：

* Image = レシピ
* Container = 調理中の料理

---

## 9. コンテナの削除（hello-world など）

### すべてのコンテナを停止

```
docker stop $(docker ps -aq)
```

### すべてのコンテナを削除

```
docker rm $(docker ps -aq)
```

### 確認

```
docker ps -a
```

（Image は削除されない）

---

## 10. ターミナル操作（コピー・中断）

* `Ctrl + C` → 実行中の処理を中断
* `Ctrl + Shift + C` → コピー（GUI ターミナル）
* `Ctrl + Shift + V` → ペースト

---

## 11. Node.js のインストール（推奨方法）

⚠️ Ubuntu 標準の Node.js は古いことが多いため非推奨

### NodeSource から Node.js 20 LTS を導入

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 確認

```
node -v
npm -v
```

---

## 12. Node.js のアップデートについて

* `apt upgrade` では **Node 20 → 24 にはならない**
* インストールしたメジャーバージョンは維持される
* 別バージョンを使う場合は nvm や別リポジトリを利用

➡️ Node.js 20 LTS は業務用途に最適

---

## 13. Ubuntu でのプログラム配置場所

* システムバイナリ：`/usr/bin`, `/usr/lib`
* グローバル設定：`/etc`
* ユーザーデータ：`/home/newuser`
* Snap：分離環境（ユーザー共通）

### インストール済みプログラム一覧

apt：

```
apt list --installed
```

snap：

```
snap list
```

---

## 14. Visual Studio Code

* すでにインストール済み
* snap または公式リポジトリ経由で自動更新

確認：

```
code --version
```

---

## 15. 最終状態

現在の状態：

* Ubuntu 環境がクリーン
* 専用ユーザー作成済み
* ネットワーク動作確認済み
* Docker 正常稼働
* Node.js 20 LTS 導入済み
* VS Code インストール・最新状態

➡️ **開発・デプロイ可能なサーバー基盤が完成**

---
