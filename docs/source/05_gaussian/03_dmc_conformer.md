# DMCの構造最適化と配座探索

この節では，炭酸ジメチル（DMC，CH<sub>3</sub>O–C(=O)–OCH<sub>3</sub>）を例に，分子の構築から構造最適化と振動計算（Opt+Freq）までの基本の流れを学ぶ。続けて，二面角を変えた配座をすべて計算して比べる**配座探索**を行う。

## 1. DMCの構築
DMCは，カルボニル炭素に酸素原子が3つ結合した分子である。

1. Builderパレットの**Element**ボタンで**C**を選び，結合様式から**sp<sup>2</sup>炭素**を選んでViewウインドウをクリックする。
2. **O**を選び，結合様式から**カルボニル酸素**（二重結合の酸素）を選んで，炭素上の水素を1つクリックする。C=O結合ができる。
3. **O**の**エーテル酸素**（Oxygen Tetravalent）を選び，残り2つの水素をそれぞれクリックする。
4. **C**の**sp<sup>3</sup>炭素**を選び，2つのOH基の水素をそれぞれクリックしてメチル基にする。
5. **Clean**で構造を整える。

```{figure} ./images/03_dmc_conformer/DMC.png

DMCの構造
```
### 配座の設定
DMCは，2つのC–O単結合の周りの回転によって**配座**が変わる。この節では，最も安定な**cis-cis配座**を作る。

- ここでは，C(=O)–O結合を挟んで，メチル基がカルボニル酸素と**同じ側**にあるものを**cis**，**反対側**にあるものを**trans**と呼ぶ。
- 二面角 O=C–O–C(H<sub>3</sub>) が0°ならcis，180°ならtransである。

DMCには2つのC(=O)–O結合があるので，次の3つの配座が考えられる。cis-trans体とtrans-trans体は，後の「4. 配座探索」で計算する。

| 配座 | 二面角1 | 二面角2 | 初期構造の点群 |
|---|---|---|---|
| cis-cis（cc） | 0° | 0° | C<sub>2v</sub> |
| cis-trans（ct） | 0° | 180° | C<sub>s</sub> |
| trans-trans（tt） | 180° | 180° | C<sub>2v</sub> |

```{figure} ./images/03_dmc_conformer/DMC_cis_trans_target.png

cis-trans体（左）とcis-cis体（右）。この節ではcis-cis体を作成する
```

**Dihedral**ボタンで，カルボニル酸素→カルボニル炭素→エーテル酸素→メチル炭素の順に4原子をクリックし，二面角を**0°**にする。もう一方のメチル基も同様に0°にする。
最後に**Symmetrize**をクリックすると，Viewウインドウ下の点群表示が**C<sub>2v</sub>**になる。

```{note}
cis/transの呼び方は文献によって異なる（syn/anti，*Z*/*E*と呼ぶこともある）。文献の値と比べるときは，どの二面角を基準にしているかを確認すること。
```

## 2. 計算の設定
5.2節のECと同じ設定で計算する。

<details>
<summary>設定の一覧（クリックで表示）</summary>

| パネル | 項目 | 設定 |
|---|---|---|
| Job Type | | **Opt+Freq** |
| Method | Method | Ground State → DFT → Default Spin → **WB97XD** |
| Method | Basis Set | **6-311G**，**+**，**(2d,p)** |
| Method | Charge / Spin | **0** / **Singlet** |
| Title | | `DMC cis-cis opt freq` |
| Link 0 | Memory / Processors | 計算するマシンに合わせる（例：1 GB / 2） |
| Link 0 | Chkpoint File | Default name，**Full Path**にチェック |
| General | | **Additional Print**にチェック |
| Additional Keywords | | `scf=tight int=ultrafine` |

</details>

**Submit**をクリックして，入力ファイルを`DMC_cc.gjf`として保存し，計算を実行する。


## 3. 計算結果の確認（cis-cis体）
`DMC_cc.log`を開いて，次の3点を確認する。

1. **構造最適化が収束しているか**：**Results > Summary**の**Opt**タブで確認する。ログファイルでは，収束判定の4項目（Maximum Force，RMS Force，Maximum Displacement，RMS Displacement）がすべて`converged`になっているかを確認する。
2. **負の振動数がないか**：**Results > Vibrations**で，一番上（最も小さい）の振動数が正であることを確認する。負の振動数がある場合は，その構造は極小ではないので，構造を変えてからOpt+Freqをやり直す。
3. **後で使う値を記録する**：エネルギーは**Results > Summary**（熱力学量は**Thermo**タブ），C=O伸縮振動数は**Results > Vibrations**で確認する。C=O伸縮振動はIR強度が最も大きいピークの1つ（1700–1900 cm<sup>−1</sup>付近）で，アニメーションでC=O結合が伸び縮みしていることを確かめる。



### IRスペクトルと振動モードの観察
**Results > Vibrations**で，いくつかの振動モードをアニメーションで見ておく。

- **Spectrum**をクリックしてIRスペクトルを表示し，1700–1900 cm<sup>−1</sup>付近の強いピークがC=O伸縮振動であることを確認する（1200–1300 cm<sup>−1</sup>付近にはC–O伸縮振動の強いピークも現れる）。
- 振動数が最も大きいのは，C–H伸縮振動（3000 cm<sup>−1</sup>付近）である。アニメーションで，軽い水素原子が最も速く振動していることを確かめる。振動数は結合の強さ（力の定数）が大きいほど，原子が軽いほど大きくなる。
- 振動数の小さいモード（数百 cm<sup>−1</sup>以下）には，メチル基のねじれなど，分子全体がゆっくり動く振動が現れる。

```{figure} ./images/03_dmc_conformer/DMC_vib_CO.png

C=O伸縮振動
```

## 4. 配座探索
構造最適化は初期構造の近くの極小に落ち着くだけなので，1つの初期構造からの計算では最も安定な構造が得られるとは限らない。
そこで，二面角を少しずつ回しながらエネルギーの変化を調べ，エネルギーの極小になる配座をすべて見つける**配座探索**を行う。

ここでは，**緩和スキャン（relaxed scan）**を使う。緩和スキャンでは，指定した二面角を一定の角度ずつ変えながら，各ステップでその二面角だけを固定して残りの構造を最適化する。これにより，二面角に対するエネルギー曲線（ポテンシャルエネルギー曲線）が得られる。

配座探索は，次の流れで行う。

| ステップ | 計算 | わかること |
|---|---|---|
| 1 | cis-cis体から，片方の二面角 O=C–O–C を回す緩和スキャン | cis-cis ⇄ cis-trans のエネルギー曲線，回転障壁 |
| 2 | cis-trans体から，もう一方の二面角を回す緩和スキャン | cis-trans ⇄ trans-trans のエネルギー曲線 |
| 3 | cis-trans体（スキャン1の極小）をOpt+Freqで最適化する | cis-trans体の正確なエネルギー，安定構造かどうか |

### スキャン1：cis-cis → cis-trans
1. 「3. 計算結果の確認」で得たcis-cis体の最適化構造（`DMC_cc.log`）を開く。
2. メニューの**Tools > Redundant Coordinates**を選び，**Redundant Coordinate Editor**を開く。
3. **Add**ボタンをクリックし，Coordinateのプルダウンメニュー（Unidentifiedと表示されている）を**Dihedral**にする。
4. Viewウインドウで，カルボニル酸素 → カルボニル炭素 → エーテル酸素 → メチル炭素の順に4原子をクリックする。Coordinate欄に4つの原子番号が入る（手で直接入力してもよい）。
5. Addと表示されているプルダウンメニューを**Scan Coordinate**にし，右側に現れる2つの欄を **Take 18 Step(s) of size 10 degrees** にする。二面角を0°から180°まで10°ずつ回し，初期構造と合わせて19個の構造最適化が自動で行われる。
6. **Ok**で閉じる。
```{figure} ./images/03_dmc_conformer/DMC_scan_setting.png

Redundant Coordinate Editorの設定
```

次に，**Gaussian Calculation Setup**を開く。Redundant Coordinate Editorの設定が正しくできていれば，Job Typeは**Scan**と**Relaxed (Redundant Coord)**が自動で選ばれている（選ばれていない場合は自分で選ぶ）。それ以外の設定は「2. 計算の設定」と同じにして，Titleを`DMC scan cc-ct`に変える。ルートセクションには`opt=modredundant`が入る。

<details>
<summary>設定の一覧（クリックで表示）</summary>

| パネル | 項目 | 設定 |
|---|---|---|
| Job Type | | **Scan**，**Relaxed (Redundant Coord)** |
| Method | Method | Ground State → DFT → Default Spin → **WB97XD** |
| Method | Basis Set | **6-311G**，**+**，**(2d,p)** |
| Method | Charge / Spin | **0** / **Singlet** |
| Title | | `DMC scan cc-ct` |
| Link 0 | Memory / Processors | 計算するマシンに合わせる（例：1 GB / 2） |
| Link 0 | Chkpoint File | Default name，**Full Path**にチェック |
| General | | **Additional Print**にチェック |
| Additional Keywords | | `scf=tight int=ultrafine` |

</details>

```text
#p opt=modredundant wb97xd/6-311+g(2d,p) scf=tight int=ultrafine geom=connectivity
```

`DMC_scan1.gjf`として保存して実行する。

```{note}
片方のメチル基だけを回すエネルギー曲線は，0°と180°を境に左右対称になるので，0°から180°までの計算で十分である。曲線を360°分描きたい場合は **Take 35 Step(s) of size 10 degrees** にする（計算時間は約2倍になる）。
```

### スキャン結果の見方
1. 計算が終わったら`DMC_scan1.log`を開く。Viewウインドウ左上の緑色のボタンをクリックすると，二面角を回していく様子がアニメーションで表示される。隣の欄の数字で，特定のステップの構造を表示できる。
2. **Results > Scan**を選ぶと，二面角に対するエネルギー曲線が表示される。
3. グラフ上で右クリックして**Properties**を選び，次のように表示を変えると見やすい。
   - **Units**をHartreeから**kcal/mol or eV**に変える。
   - グラフの一番左の点（0°，cis-cis体）を選んだ状態で**Current**ボタンを押すと，cis-cis体のエネルギーを0とした相対エネルギーで表示される。
4. 数値を自分でグラフにしたいときは，グラフ上で右クリックして**Save Data**でテキストファイルに保存する。

```{figure} ./images/03_dmc_conformer/DMC_scan_result.png

Scanのエネルギー曲線
```

曲線から，次の点を読み取れる。

- 0°（cis-cis）と180°（cis-trans）付近に極小があるか
- 2つの極小のエネルギー差
- 極小の間にある山の高さ（**回転障壁**）

### スキャン2：cis-trans → trans-trans
スキャン1で180°付近の極小にあたるステップの構造を表示し，**File > Save**で`DMC_ct_scan.gjf`として保存する。この構造を開き，スキャン1と同じ手順で，**まだ回していない方**のメチル基の二面角 O=C–O–C を0°から180°まで10°ずつ回す緩和スキャンを行う（`DMC_scan2.gjf`）。

```{figure} ./images/03_dmc_conformer/DMC_scan_ct.png

Redundant Coordinate Editorの設定
```

180°付近（trans-trans）に極小が現れるかどうかを確認する。

```{admonition} trans-trans配座について
:class: warning
trans-trans配座では，2つのメチル基が向かい合って立体反発が大きい。スキャン2の曲線で180°付近に**はっきりした極小がない**場合や，平面からねじれた位置に極小がある場合もある。
はっきりした極小がない場合は，**trans-transは安定構造として存在しない**ことになる。これも重要な結果である。
```

### 極小構造の最適化（Opt+Freq）
緩和スキャンでは二面角を固定して最適化しているので，極小の構造やエネルギーは近似的なものである。また，振動計算をしていないので，安定構造かどうかも確かめられていない。
そこで，スキャン1の180°付近の極小にあたるステップの構造を**File > Save**で`DMC_ct.gjf`として保存し，「2. 計算の設定」と同じ設定（Opt+Freq）で最適化し直す（Titleは`DMC cis-trans opt freq`に変える）。

trans-trans体は後の節では使わないので，スキャン2のエネルギー曲線で確認するだけでよい。

計算が終わったら，「3. 計算結果の確認」と同じように，構造最適化が収束していることと，**負の振動数がない**ことを確認する。

```{admonition} 計算結果の例
:class: tip
相対エネルギーは，cis-cis体を基準（0）にして Δ*E* = (*E* − *E*<sub>cis-cis</sub>) × 627.509 kcal/mol で求める。

| 配座 | *E*<sub>elec</sub> / Hartree | Δ*E*<sub>elec</sub> / kcal mol<sup>−1</sup> | 双極子モーメント / Debye |
|---|---|---|---|
| cis-cis | −343.610120 | 0.0 | 0.39 |
| cis-trans | −343.605105 | 3.15 | 3.71 |
| trans-trans | ― | ― | ― |

trans-trans体は，スキャン2で極小が見つからなかったため「―」とした。
```

```{admonition} 考えてみよう
:class: note
- cis-cis体とcis-trans体のどちらが安定か。その理由を，メチル基とカルボニル酸素の位置関係から考えてみよう。
- cis-trans体の双極子モーメントが，cis-cis体よりずっと大きいのはなぜだろうか。
- スキャン2で，trans-transに極小が見つからなかったのはなぜだろうか。スキャン中の**もう一方のメチル基の二面角**がどう変化したかに注目してみよう。
```

## 5. 分子軌道の表示
チェックポイントファイル（`DMC_cc.chk`）を開くと，分子軌道を表示できる。

1. ツールバーの**分子軌道アイコン**（p軌道の形のアイコン）をクリックして，**MOs**ダイアログを開く。右側に軌道のエネルギー準位が表示され，HOMOとLUMOが選ばれた状態になっている。
2. 描きたい軌道を選んで**Visualize**タブの**Update**をクリックすると，軌道が描画される。

軌道エネルギーの単位はHartreeである。論文などではeV単位（1 Hartree = 27.2114 eV）で示すことが多い。HOMOとLUMOのエネルギーは第5節で使う。
