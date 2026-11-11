# Li<sup>+</sup>-DMCの配位エネルギー

リチウムイオン電池の電解液中では，Li<sup>+</sup>は溶媒分子のカルボニル酸素に配位して**溶媒和**されている。
この節では，Li<sup>+</sup>とDMC 1分子の錯体（Li<sup>+</sup>-DMC）を計算し，cis-cis配座とcis-trans配座への配位エネルギーを比べる。

## 1. 配位エネルギーの定義
Li<sup>+</sup>とDMCから錯体ができる反応

$$
\text{Li}^+ + \text{DMC} \rightarrow \text{Li}^+\text{-DMC}
$$

の**配位エネルギー**（結合エネルギー）を次のように定義する。

$$
\Delta E_{\text{bind}} = E(\text{Li}^+\text{-DMC}) - E(\text{Li}^+) - E(\text{DMC})
$$

Δ*E*<sub>bind</sub>が負で絶対値が大きいほど，Li<sup>+</sup>とDMCは強く結合している。

ここで，*E*(DMC)にどの構造を使うかで意味が変わることに注意する。

| 基準にするDMC | 意味 |
|---|---|
| 同じ配座のDMC（cc錯体にはcc，ct錯体にはct） | その配座の分子とLi<sup>+</sup>との相互作用の強さ |
| 最も安定な配座のDMC（cis-cis） | 配座を変える損（配座エネルギー）も含めた，実際の錯形成のしやすさ |

両方を計算して比べるとよい。

## 2. Li<sup>+</sup>の計算
Li<sup>+</sup>は原子1つなので，構造最適化や振動計算は必要ない。一点計算（Energy）でエネルギーを求める。

1. **File > New**で新しいViewウインドウを開く。
2. **Element**で**Li**を選び，結合様式から原子だけのもの（Li Atom）を選んでクリックする。
3. **Gaussian Calculation Setup**で次のように設定する。

| パネル | 設定 |
|---|---|
| Job Type | **Energy** |
| Method | WB97XD，6-311+G(2d,p)，**Charge: 1**，**Spin: Singlet** |
| General | Additional Print |
| Additional Keywords | `scf=tight int=ultrafine` |

`Li.gjf`として保存して実行する。

```{note}
Li<sup>+</sup>は電子を2つしか持たない（1s<sup>2</sup>）。全エネルギーはおよそ −7.3 Hartree になる。値が大きく異なる場合は，電荷の設定を確認する。
```

## 3. Li<sup>+</sup>-DMC錯体の構築
第3節で最適化したDMC（cis-cis，cis-trans）の構造を使って錯体を作る。

1. `DMC_cc.log`（最適化構造）を開く。
2. **Element**で**Li**の原子（Li Atom）を選び，Viewウインドウの何もない場所をクリックしてLiを置く。
3. **Bond**ボタンでカルボニル酸素とLiを選び，Li–O距離を**1.8 Å**程度にする。Bond Typeは**None**のままでよい。
4. **Angle**ボタンでC=O…Liの角度を**180°**程度にする（Liがカルボニル酸素の延長線上にくるようにする）。
5. 錯体の初期構造を`LiDMC_cc.gjf`として保存する。

cis-trans配座についても同様に`LiDMC_ct.gjf`を作る。
```{figure} ./images/04_li_coordination/li_coordination.png

Li+-DMC錯体の初期構造
```

```{tip}
結合していない原子どうしの位置関係は，**Bond**ボタンで距離を指定するのが簡単である。また，Li<sup>+</sup>はカルボニル酸素以外（エーテル酸素など）にも配位しうる。余裕があれば，いくつかの初期配置から計算して，最も安定な配位構造を探してみるとよい。
```


## 4. 計算の設定と実行
| パネル | 設定 |
|---|---|
| Job Type | **Opt+Freq** |
| Method | WB97XD，6-311+G(2d,p)，**Charge: 1**，**Spin: Singlet** |
| General | Additional Print |
| Additional Keywords | `scf=tight int=ultrafine pop=npa` |

錯体の計算では，Liの電荷（NPA電荷）を求めるために，いつもの2つのキーワードに`pop=npa`を追加する。

```{warning}
錯体全体の電荷は**+1**である。Chargeを0のままにすると，中性のLi原子とDMCの錯体（ラジカル）を計算してしまう。ルートセクションの下の電荷とスピン多重度が`1 1`になっていることを確認する。
```
        

## 5. 結果の確認
1. `Normal termination`が2回出ていて，虚数振動がないことを確認する。
2. 最適化構造のLi–O距離，C=O結合長，C=O…Li角度を確認する。DMC単体（第3節）と比べて，C=O結合長はどう変わったか。
3. **Results > Charge Distribution**でLiの電荷を確認する。+1からどのくらい減っているか（DMCからLiへどのくらい電荷が移っているか）。

### 配位エネルギーの計算

```{admonition} 計算結果の例
:class: tip
Liの電荷はNPA電荷である。

| 分子 | *E*<sub>elec</sub> / Hartree | Li–O 距離 / Å | C=O 結合長 / Å | C=O 伸縮振動数 / cm<sup>−1</sup> | C=O…Li 角度 / ° | Li の電荷 |
|---|---|---|---|---|---|---|
| Li<sup>+</sup> | −7.292710 | ― | ― | ― | ― | +1 |
| DMC（cis-cis） | −343.610120 | ― | 1.202 | 1828 | ― | ― |
| DMC（cis-trans） | −343.605105 | ― | 1.196 | 1856 | ― | ― |
| Li<sup>+</sup>-DMC（cis-cis） | −350.970199 | 1.752 | 1.236 | 1724 | 180 | +0.987 |
| Li<sup>+</sup>-DMC（cis-trans） | −350.976546 | 1.790 | 1.232 | 1743 | 136 | +0.984 |

| 錯体 | Δ*E*<sub>bind</sub>（同じ配座基準）/ kcal mol<sup>−1</sup> | Δ*E*<sub>bind</sub>（cis-cis基準）/ kcal mol<sup>−1</sup> |
|---|---|---|
| Li<sup>+</sup>-DMC（cis-cis） | −42.3 | −42.3 |
| Li<sup>+</sup>-DMC（cis-trans） | −49.4 | −46.3 |
```

```{admonition} 考察のポイント
:class: note
- DMC単体ではcis-cisの方が安定であった（第3節）。Li<sup>+</sup>と配位した錯体では，cis-cisとcis-transのどちらがより強く結合している？
- その違いを，第3節で求めた**双極子モーメント**の違いと関連づけると？
- 配座を変える損（配座エネルギー）と，配位による得（配位エネルギーの差）を比べると，Li<sup>+</sup>の周りではどちらの配座が有利になる？
- Liの電荷は+1からどのくらい減っているだろうか。そこから，Li<sup>+</sup>とDMCの結合がどのような相互作用によるものか？
- 配位によって，C=O結合長とC=O伸縮振動数はどう変わった？その理由は？
```

