# Nguyen-Viet-Anh

Here is a list of the times I spent on each problem:
Problem 1: 30 minutes
Problem 2: 2 hours
Problem 3: 30 minutes

In problem 2: every time there is any change of input, you should press "Swap again" button to change the currency unit
In problem 3, some errors I noticed are:
1: "balance: WalletBalance" and "balance.blockchain" => WalletBalance is missing blockchain attribute
2: case 'Zilliqa' and 'Neo' both return 20
3: some if else and return cases can be shortened to make it easier to understand
4: When using useMemo() I noticed that the "prices" dependencies do not affect the calculation result so I think it can be removed
5: const rows = sortedBalances.map(...) I think it is a mistake and replace it with "formattedBalances" due to "balance: FormattedWalletBalance"

99Tech
