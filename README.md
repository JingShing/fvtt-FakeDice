English | [繁體中文](README_TCH.md)
# fvtt-FakeDice
FakeDice is based on a old module "[Fudge](https://github.com/troygoode/fvtt-fudge)". Since it is old module and have a period of time not update.

So I have do some research on how to make it perfect.

FakeDice can work on every mod and gameSystem. If they are still using the foundryVTT dice system.

You can easily learn how to use it. Just put ```>1``` or ```<=20``` something like that into target result. And click "Replace" button to Transform all the dice result to target result.

Now every dice you roll will meet the target result you want.

After get the result just click "Origin" to make it back to normal dice.

# Notice
This module will only work on gameMaster.

This module is not using edit dice method. It is using simulation. So it will only get legal dice result.

# Operators
```
Target Operators:
=
>
>=
<
<=
```

# How To Install
* You can get this module on [foundryVTT Module](https://foundryvtt.com/packages/fakedice)
* You can install manually with this Manifest URL:
```
https://raw.githubusercontent.com/JingShing/fvtt-FakeDice/main/module.json
```

# How to make player using fake dice
* Open Setting
* Select "FakeDice"
* Enable the "Player Fake Dice Enable" to replace dice to formula
* If you want to make it back to normal just disable "Player Fake Dice Enable"

## Player FakeDice example
* ![v2_1](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_1.png)
* ![v2_2](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_2.png)
* ![v2_3](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_3.png)

# FakeDice Example
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
FakeDice is based on a old module "[Fudge](https://github.com/troygoode/fvtt-fudge)". Since it is old module and have a period of time not update.

So I have do some research on how to make it perfect.

FakeDice can work on every mod and gameSystem. If they are still using the foundryVTT dice system.

You can easily learn how to use it. Just put ```>1``` or ```<=20``` something like that into target result. And click "Replace" button to Transform all the dice result to target result.

Now every dice you roll will meet the target result you want.

After get the result just click "Origin" to make it back to normal dice.

# Notice
This module will only work on gameMaster.

This module is not using edit dice method. It is using simulation. So it will only get legal dice result.

# Operators
```
Target Operators:
=
>
>=
<
<=
```

# How To Install
You can install manually with this Manifest URL:

```
https://raw.githubusercontent.com/JingShing/fvtt-FakeDice/main/module.json
```

# Example
## <=1
* ![st1_1](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/st1_1.png)
* ![st1_2](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/st1_2.png)
* ![st1_3](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/st1_3.png)
## >=20
* ![st2_1](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/gt20_1.png)
* ![st2_2](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/gt20_2.png)
* ![st2_3](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/gt20_3.png)
* ![st2_4](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/gt20_4.png)

## Ver 0.0.2
# Feature
Now GameMaster can using setting to set fakeDice on players to make them using fake dice.

# How to use
* Open Setting
* Select "FakeDice"
* Enable the "Player Fake Dice Enable" to replace dice to formula
* If you want to make it back to normal just disable "Player Fake Dice Enable"

## example
* ![v2_1](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_1.png)
* ![v2_2](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_2.png)
* ![v2_3](https://github.com/JingShing/fvtt-FakeDice/blob/main/image/v2_3.png)
</details>
