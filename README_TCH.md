[English](README.md) | 繁體中文
# fvtt-FakeDice
假骰子(FakeDice) 是基於一個舊模組 "[Fudge](https://github.com/troygoode/fvtt-fudge)"。這個模組已經有一段時間沒有更新，且功能尚有欠缺。

所以我做了一些研究，並製作了這個模組。

假骰子(FakeDice)可以作用在任何的系統和模組上，只要系統和模組是基於原版的骰子進行更改，就能作用。

你可以簡單的學會如何使用這個模組：只要填入 ```>1``` 或 ```<=20``` 一類的內容到目標數值中。 點擊 "Replace" 按鈕，就可以將後續所有的骰子都變為你所想要的骰子。

現在起所有你的骰子都會完美的符合你填寫的目標數值。

得到滿意的結果後，點擊 "Origin" 按鈕，來讓骰子變回普通骰子。

# 注意
這個模組只適用於 GM。

這個模組並沒有修改骰面，是採用模擬的方式來修改骰子。只能出現合理數值。

# 可使用的符號
```
目標符號:
=
>
>=
<
<=
```

# 如何安裝
* 你現在可以到官方的 [foundryVTT Module](https://foundryvtt.com/packages/fakedice) 找到並安裝
* 可以使用以下的連結，進行手動的安裝：
```
https://raw.githubusercontent.com/JingShing/fvtt-FakeDice/main/module.json
```

# 如何讓玩家使用假骰子
* 打開設定
* 選擇 "FakeDice"
* 啟用 "Player Fake Dice Enable" 選項，讓玩家套用你指定的公式
* 如果想要復原，就關閉 "Player Fake Dice Enable"

## GM 讓玩家使用假骰子範例
* ![v2_1](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_1.png)
* ![v2_2](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_2.png)
* ![v2_3](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_3.png)

# GM使用假骰子範例
## <=1
* ![st1_1](image/st1_1.png)
* ![st1_2](image/st1_2.png)
* ![st1_3](image/st1_3.png)
## >=20
* ![st2_1](image/gt20_1.png)
* ![st2_2](image/gt20_2.png)
* ![st2_3](image/gt20_3.png)
* ![st2_4](image/gt20_4.png)

<details>
<summary>Update Log</summary>

## Ver 0.0.1

# fvtt-FakeDice
假骰子(FakeDice) 是基於一個舊模組 "[Fudge](https://github.com/troygoode/fvtt-fudge)"。這個模組已經有一段時間沒有更新，且功能尚有欠缺。

所以我做了一些研究，並製作了這個模組。

假骰子(FakeDice)可以作用在任何的系統和模組上，只要系統和模組是基於原版的骰子進行更改，就能作用。

你可以簡單的學會如何使用這個模組：只要填入 ```>1``` 或 ```<=20``` 一類的內容到目標數值中。 點擊 "Replace" 按鈕，就可以將後續所有的骰子都變為你所想要的骰子。

現在起所有你的骰子都會完美的符合你填寫的目標數值。

得到滿意的結果後，點擊 "Origin" 按鈕，來讓骰子變回普通骰子。

# 注意
這個模組只適用於 GM。

這個模組並沒有修改骰面，是採用模擬的方式來修改骰子。只能出現合理數值。

# 可使用的符號
```
目標符號:
=
>
>=
<
<=
```

# 如何安裝
* 你現在可以到官方的 [foundryVTT Module](https://foundryvtt.com/packages/fakedice) 找到並安裝
* 可以使用以下的連結，進行手動的安裝：
```https://raw.githubusercontent.com/JingShing/fvtt-FakeDice/main/module.json```

# GM 假骰子範例
## <=1
* ![st1_1](image/st1_1.png)
* ![st1_2](image/st1_2.png)
* ![st1_3](image/st1_3.png)
## >=20
* ![st2_1](image/gt20_1.png)
* ![st2_2](image/gt20_2.png)
* ![st2_3](image/gt20_3.png)
* ![st2_4](image/gt20_4.png)

## Ver 0.0.2
# 功能
現在 GM 可以透過設定，來讓玩家使用假骰子。

# 如何使用
* 打開設定
* 選擇 "FakeDice"
* 啟用 "Player Fake Dice Enable" 選項，讓玩家套用你指定的公式
* 如果想要復原，就關閉 "Player Fake Dice Enable"

## 範例
* ![v2_1](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_1.png)
* ![v2_2](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_2.png)
* ![v2_3](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_3.png)

## Ver 0.0.3
* 支持 fvtt 十一版
</details>
