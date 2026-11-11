# GaussViewの初期設定と基本操作

## 1. 初期設定
計算を始める前に，GaussViewの設定を変更しておく。

### 分子軌道の表示色
デフォルトの分子軌道の色は見にくいため，次のように変更する。(Macでの操作例)

1. **GaussView > Settings**を開く
2. **Colors > Surface Colors** を選ぶ
3. **Molecular Orbital > Solid** を次のように設定する

| 項目 | 設定値 |
|---|---|
| Scheme | 1-Color Shaded |
| Style Type | Solid |
| 正の位相（左の色） | Red: 190，Green: 197，Blue: 16 |
| 負の位相（右の色） | Red: 88，Green: 181，Blue: 232 |

左右の色の四角をクリックして，それぞれRed，Green，Blueの値を入力する。

```{figure} ./images/02_gaussview_basics/mol_orb_setting.png
:width: 80%

Surface Colorsの設定画面（左）と，設定後の分子軌道の表示例（右）
```

### 等値面の表示形式
分子軌道や電子密度の等値面は，半透明にすると分子の骨格と重ねて見やすくなる。

1. **GaussView > Settings**（Windowsでは**File > Preferences**）を開く
2. **Display Format > Surface** を選ぶ
3. **Format** を **Transparent** にする
4. **Transparent Options** のスライダーを**半分くらい**にする

```{figure} ./images/02_gaussview_basics/mol_orb_transparent.png
:width: 80%

Display formatの設定画面
```

### GaussViewの起動と終了
GaussViewの起動は、Launchpadからgviewのアイコンをクリックすると次のようなGaussViewの初期起動画面が表示される。
```{figure} ./images/02_gaussview_basics/gview_start.png
:width: 80%

GaussViewの初期起動画面
```
GaussViewの終了は，GaussViewメニューのQuit GaussViewで行える。
```{figure} ./images/02_gaussview_basics/gview_finish.png
:width: 80%

GaussViewの終了
```

## 2. 分子構造の構築
分子は，**Builderパレット**（**View > Builder**で表示）を使って，**Viewウインドウ**（分子を表示する，背景が青紫色のウインドウ）上で組み立てる。基本の手順は次のとおりである。

1. Builderパレットでフラグメント（原子，環，置換基など）を選ぶ。選んだフラグメントを**カレントフラグメント**と呼ぶ。
2. Viewウインドウ上でクリックすると，カレントフラグメントが配置される。
3. 1と2を繰り返して分子を組み立てる。

### クリックする場所による動作の違い
| クリックする場所 | 動作 |
|---|---|
| 何もない場所 | カレントフラグメントが新しく配置される |
| 分子の水素原子 | 水素がカレントフラグメントに置き換わって結合する |
| 分子の水素以外の原子 | その原子がカレントフラグメントの原子に置き換わる |

### 例：炭酸エチレン（EC）の構築
炭酸エチレン（ethylene carbonate，EC）は，DMCとともにリチウムイオン電池の電解液に使われる環状カーボネートである。五員環の中に，O–C(=O)–O の炭酸エステル部分と CH<sub>2</sub>–CH<sub>2</sub> を含む。

```{figure} ./images/02_gaussview_basics/EC.png
:width: 50%

炭酸エチレン（EC）の構造
```

1. Builderパレットの**Rings**ボタンをダブルクリックし，環フラグメントパレットから**シクロペンタン**を選んでViewウインドウをクリックする。
2. **Element**ボタンをクリックし，周期表から**O**を選ぶ。結合様式からエーテル酸素（Oxygen Tetravalent）を選ぶ。環の炭素を1つおきに2つ（1位と3位）クリックする。炭素がエーテル酸素に置き換わり，1,3-ジオキソランの骨格になる。
3. 2つの酸素に挟まれた炭素（2位）にカルボニル酸素を付ける。結合様式から原子状の酸素（**O Atom**）を選び，2位の炭素の水素を1つクリックする。
4. **Delete Atom**ボタンで，2位の炭素に残っている水素を削除する。
5. **Bond**ボタンで2位の炭素と付けた酸素を選び，Bond Typeを**Double**にする。
6. **Clean**で構造を整える。

```{figure} ./images/02_gaussview_basics/EC_gene.png
:width: 80%

ECの構築
```

```{note}
手順4でカルボニル酸素（二重結合の酸素）を直接選んで水素をクリックすると，「Invalid placement. Valence mismatch」というエラーになる。水素との結合は単結合なので，二重結合の酸素とは結合様式が合わないためである。そのため，いったん原子状の酸素を付けてから，Bondボタンで二重結合に変える。
```

ECの五員環は完全な平面ではなく，CH<sub>2</sub>–CH<sub>2</sub>部分がねじれた構造（C<sub>2</sub>対称）が安定である。

### Builderパレットの主なボタン
````{container} side-by-side
```{figure} ./images/02_gaussview_basics/builder_numbered.png
:width: 160px

Builderパレット
```

| 番号 | ボタン | 機能 |
|---|---|---|
| 1 | Element | 周期表から原子と結合様式を選ぶ |
| 2 | Rings | ベンゼン，シクロヘキサンなどの環構造を選ぶ |
| 3 | R-Group | 代表的な置換基を選ぶ |
| 4 | カレントフラグメント | 選んでいるフラグメントが表示される。クリックすると結合様式などを選び直せる |
| 5 | Bond | 2原子を選んで結合長や結合の種類を変える |
| 6 | Angle | 3原子を選んで結合角を変える |
| 7 | Dihedral | 4原子を選んで二面角を変える |
| 8 | Inquire | 結合長・結合角・二面角を確認する（変更はできない） |
| 9 | Add Valence | 原子価を1つ増やす（水素が付く） |
| 10 | Delete Atom | 原子を削除する |
| 11 | Center | 分子をViewウインドウの中央に戻す |
| 12 | Clean | 構造を簡易的に整える |
| 13 | Symmetrize | 分子に対称性を課す |
````


- **Clean**は簡易的な機能なので，必ずしも適切な構造にはならない。初期構造は計算結果を左右するため，整えた構造をよく確認してから計算する。
- 操作を取り消すときは**Edit > Undo**（macOSでは⌘+Z）を使う。

### Viewウインドウでのマウス操作

| マウス | トラックパッド | 機能 |
|---|---|---|
| 左ドラッグ | クリックしたままドラッグ | 回転（X軸・Y軸周り） |
| 右ドラッグ（左右） | 2本指でクリックしたまま左右にドラッグ | 回転（Z軸周り） |
| 右ドラッグ（上下），スクロール | 2本指でクリックしたまま上下にドラッグ，2本指で上下にスワイプ | 拡大・縮小 |
| Shift＋左ドラッグ | Shift＋クリックしたままドラッグ | 平行移動 |
| Option（⌥）＋上記の操作 | Option（⌥）＋上記の操作 | 結合していない分子を個別に操作 |



### 構造の保存と読み込み
- 保存：**File > Save**。構造データを保存するときは，Gaussian入力ファイル（`.gjf`）形式を選び、自分の好きなディレクトリーに保存する。
- 読み込み：**File > Open**。`.gjf`，`.log`，`.chk`，`.fchk`，`.pdb`，`.xyz`などを読み込める。

```{warning}
フォルダ名やファイル名に**全角文字やスペースを使わない**。保存や計算でエラーになることがある。
```


## 3. Gaussian計算の設定（Gaussian Calculation Setup）
計算の設定は，分子が表示されたViewウインドウをアクティブにしてから，**Calculate > Gaussian Calculation Setup**を選んで行う。ここでは、先ほど作成したECを用いて計算を行う。
ダイアログの上部には，各パネルで設定した内容（ルートセクション）が表示される。

### Job Typeパネル
ジョブの種類を選ぶ。構造最適化には**Opt+Freq**を選ぶのが基本である。

| オプション | 説明 |
|---|---|
| Optimize to a | Minimum（安定構造），TS (Berny)（遷移状態）など |
| Force Constants | 通常はDefault。最適化がうまくいかないときはCalculate at First Point |
| Use tight convergence criteria | 収束判定を厳しくする（`Opt=Tight`）。本章では**チェックを入れない** |

```{note}
本章の計算は，通常の収束判定で十分である。より厳密に議論したいとき（小さな振動数を正確に求めたい，構造をわずかな差まで比べたいなど）は，**Use tight convergence criteria**にチェックを入れる（`opt=tight`）。収束判定が約30倍厳しくなり，構造最適化のステップ数が増えるので，計算時間は長くなる。比べる計算はすべて同じ収束判定にそろえること。
```

```{figure} ./images/02_gaussview_basics/cal_jobtype.png
:width: 70%

jobtypeの設定
```

### Methodパネル
計算手法を指定する，最も重要なパネルである。本章の設定は次のとおり。

| 項目 | 設定 |
|---|---|
| Method | Ground State → DFT → Default Spin → **WB97XD** |
| Basis Set | **6-311G** → 分散関数 **+** → 分極関数 **(2d,p)** |
| Charge / Spin | 計算する分子に合わせて指定する（例：ECは 0 / Singlet） |

- **Default Spin**のままにすると，電荷とスピン多重度に応じて制限法（閉殻）か非制限法（開殻）が自動で選ばれる。
- スピン多重度のメニューに目的の値が出ないときは，電荷や構造に誤りがないか確認する。

```{figure} ./images/02_gaussview_basics/cal_method.png
:width: 70%

Methodの設定
```

### Titleパネル
計算の内容を半角英数字でメモしておく（例：`EC opt freq`）。

### Link 0パネル
| 項目 | 設定例 | 説明 |
|---|---|---|
| Memory Limit | 1 GB | 使用するメモリ量　|
| Shared Processors | 2 | 使用するCPUコア数 |

メモリ量とコア数は，計算するマシンに合わせて設定する。

### Generalパネル
| オプション | 説明 |
|---|---|
| **Additional Print** | ログファイルに詳しい情報（SCFの収束過程など）が出力される　|

**Additional Print**にチェックを入れると，ルートセクションが`#`から`#p`に変わり，ログファイルに詳しい情報（SCFの収束過程など）が出力される。計算がうまくいかないときの原因究明に役立つため、**チェックすること。**（`#p`）


### Additional Keywords
ダイアログの下部に常に表示されている欄で，パネルにないキーワードをルートセクションに直接書き加えられる。キーワードはスペースで区切って書く（全角文字は使わない）。

本章では，次の２つを**毎回書いておく**。

```text
scf=tight int=ultrafine
```

| キーワード | 内容 |
|---|---|
| `scf=tight` | SCFの収束判定を厳しくする |
| `int=ultrafine` | DFTの数値積分のグリッドを細かくする |

`scf=tight`と`int=ultrafine`はGaussian 16ではデフォルトなので，書いても結果は変わらない。Gaussian 09ではデフォルトが異なるため，書いておけばどちらのバージョンでも同じ条件で計算できる。

書いたら，ダイアログ上部のルートセクションに反映されていることを確認する。

```text
#p opt freq wb97xd/6-311+g(2d,p) geom=connectivity scf=tight int=ultrafine
```

### ボタン
| ボタン | 機能 |
|---|---|
| Submit | 入力ファイルを保存して計算を実行する |
| Edit | 入力ファイルを保存してエディタで編集する |
| Retain | 設定を保持したままダイアログを閉じる |
| Defaults | 設定をすべて初期値に戻す |

## 4. 計算の実行
**Submit**をクリックすると入力ファイルの保存を求められるので，保存場所とファイル名を指定し、saveをクリック。続けて表示されるダイアログで**Yes**をクリックすると計算が始まる。Notify when Job is finishedをチェックすると、計算終了時に画面が勝手に切り替わる。（計算は数分かかる）
````{container} figure-row
```{figure} ./images/02_gaussview_basics/cal_save.png

Gaussian インプットファイルの保存
```

```{figure} ./images/02_gaussview_basics/cal_submit.png

計算の実行（Submit Job）
```
````
```{figure} ./images/02_gaussview_basics/cal_finish.png

計算終了後の画面
```

## 5. 計算結果の表示
### 結果ファイルの開き方
計算が終わると**Gaussian Job Completed**ダイアログが表示されるので，開くファイルを選ぶ。後から開くときは**File > Open**で選ぶ。

| ファイル | 使う場面 |
|---|---|
| ログファイル（`.log`） | 構造，エネルギー，振動数など，ほとんどの結果の確認 |
| チェックポイントファイル（`.chk`/`.fchk`） | 分子軌道や電子密度などの3次元表示 |

主な結果は次のメニューから表示できる。メニューバーのほか，Viewウインドウ上で右クリックしても開ける。

| メニュー | 内容 |
|---|---|
| Results > Summary | 計算手法，全エネルギー，双極子モーメント，点群など。**Thermo**タブに熱力学量（振動計算をしたときのみ） |
| Results > Vibrations | 振動数，IR強度，振動モードのアニメーション，IRスペクトル |
| Results > Charge Distribution | 原子電荷と双極子モーメント |
| ツールバーの分子軌道アイコン（p軌道の形） | 分子軌道のエネルギー準位と形（MOsダイアログ） |
| Results > Surfaces/Contours | 分子軌道，電子密度，静電ポテンシャルなどの等値面 |
| Results > Scan | スキャン計算のエネルギー曲線 |

### ログファイルをテキストエディタで開く
ログファイル（`.log`）はテキストファイルなので，**数値を直接確かめたいとき**はテキストエディタ（VS Code，テキストエディットなど）で開く。Finderでファイルを右クリックし，「このアプリケーションで開く」からエディタを選ぶ。
開いたら**⌘ + F**で次の言葉を検索すると，目的の場所にすぐ移動できる。

| 検索する言葉 | 分かること |
|---|---|
| `Normal termination` | 計算が正常に終わったか |
| `Stationary point found` | 構造最適化が収束したか |
| `SCF Done` | 電子エネルギー（最後に出てくるものが最終結果） |
| `Frequencies --` | 振動数（最初の値が負なら虚数振動がある） |
| `Alpha  occ. eigenvalues` | 占有軌道のエネルギー（最後の値がHOMO） |
| `Alpha virt. eigenvalues` | 空軌道のエネルギー（最初の値がLUMO） |
| `Sum of electronic and thermal Free Energies` | ギブズ自由エネルギー |

原子数の多い分子ではログファイルが数MBになり，テキストエディットでは開くのが重いことがある。その場合はVS Codeを使うとよい。

### 計算の要約（Summary）
**Results > Summary**を開くと，計算手法，全エネルギー（`E(RwB97XD)`など），双極子モーメント，点群などが一覧で表示される。

- **Thermo**タブには，零点エネルギー，エンタルピー，ギブズ自由エネルギーなどの熱力学量が表示される（298.15 K，1 atm）。振動計算をしたときだけ選べる。
- **Opt**タブでは，構造最適化が収束したかを確認できる。

### 振動数の確認（Vibrations）
Opt+Freq計算の後は，**必ず振動数を確認する**。**Results > Vibrations**を開くと，振動モードごとの振動数（cm<sup>−1</sup>）とIR強度が一覧で表示される。

1. **負の振動数がないかを確認する。** Gaussianでは虚数の振動数を負の値で表示する。
   - すべて正：エネルギーの極小（安定構造）が得られている。
   - 負の値が1つ以上ある：安定構造ではない（鞍点）。負の振動数のモードを選んで**Manual Displacement**で構造をずらし，**Save Structure**で保存した構造から計算し直す。
2. 振動モードを選んで**Start Animation**をクリックすると，その振動の様子をアニメーションで確認できる。**Show Displacement Vectors**にチェックを入れると，原子の動く方向が矢印で表示される。
3. **Spectrum**をクリックすると，IRスペクトルが表示される。

```{note}
振動数の一覧は，振動数の小さい順に並んでいる。負の振動数がある場合は一番上に表示されるので，**一番上の値を見れば確認できる**。
```

### 分子軌道（MOs）
分子軌道の表示には，**チェックポイントファイル**（`.chk`/`.fchk`）を開く必要がある。

1. **Tools > MOs**を開くと，右側に軌道のエネルギー準位が並び，HOMO（電子が入っている最も高い軌道）とLUMO（電子が入っていない最も低い軌道）が選ばれた状態になっている。
2. 描きたい軌道をクリックして選ぶ（もう一度クリックすると選択が外れる）。
3. **Visualize**タブの**Update**をクリックすると，選んだ軌道の形が計算されて表示される。

- 軌道の色は，正の位相と負の位相で塗り分けられる（初期設定で変えた色）。
- 軌道エネルギーの単位はHartreeである。論文などではeV単位（1 Hartree = 27.2114 eV）で示すことが多い。
- HOMOの形からは電子を出しやすい（酸化されやすい）場所が，LUMOの形からは電子を受け入れやすい（還元されやすい）場所がわかる。

````{container} figure-row wide
```{figure} ./images/02_gaussview_basics/cal_homo.png

ECのHOMO軌道
```

```{figure} ./images/02_gaussview_basics/cal_lumo.png

ECのLUMO軌道
```
````


### 原子電荷（Charge Distribution）
**Results > Charge Distribution**を開くと，原子電荷を表示できる。

- **Type**で電荷の種類を選ぶ。additional keywordsで`pop=npa`を指定して計算した場合は**NBO**を選ぶとNPA電荷が表示される。
- **Show Numbers**にチェックを入れると，各原子の電荷の値が分子の上に表示される。
- **Dipole Moment**の**Show Vector**にチェックを入れると，双極子モーメントが矢印で表示される。

### エネルギーの単位
Gaussianのエネルギーの単位は**Hartree（a.u.）**である。

| | kcal/mol | kJ/mol | eV |
|---|---|---|---|
| 1 Hartree | 627.509 | 2625.50 | 27.2114 |
