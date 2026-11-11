# 量子化学計算（Gaussian）

この章では，GaussianとGaussViewを使った量子化学計算の基本を，リチウムイオン電池の電解液溶媒である**炭酸ジメチル（dimethyl carbonate, DMC）**を題材にして学ぶ。
分子のモデリングから始めて，配座探索，Li<sup>+</sup>との配位エネルギー，溶媒効果を含めた電子状態の解析までを順に行う。

| 節 | 内容 | 主な計算 |
|---|---|---|
| 1 | GaussianとGaussViewの概要，計算の基礎知識 | ― |
| 2 | GaussViewの初期設定と基本操作 | ― |
| 3 | DMCの構造最適化と配座探索 | DMCのOpt+Freq，cis-cis，cis-trans，trans-transの比較 |
| 4 | Li<sup>+</sup>-DMCの配位エネルギー | cis-cis，cis-transへの配位の比較 |
| 5 | 溶媒効果（SMD）と電子状態の解析（準備中） | C=O振動数，HOMO/LUMO，イオン化ポテンシャル・電子親和力 |

```{note}
本章の計算レベルは，特に断りのない限り **ωB97X-D/6-311+G(2d,p)** で統一する。
エネルギーを比較する場合は，比較するすべての分子で同じ計算レベルを用いなければならない。
```

```{toctree}
:maxdepth: 2

01_introduction_gaussian.md
02_gaussview_basics.md
03_dmc_conformer.md
04_li_coordination.md
```
