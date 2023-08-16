#%%
import pandas as pd
import matplotlib.pyplot as plt

#%%
df_1 = pd.read_csv('./k-folds-history/CNN_Model_F_1.csv')
df_2 = pd.read_csv('./k-folds-history/CNN_Model_F_2.csv')
df_3 = pd.read_csv('./k-folds-history/CNN_Model_F_3.csv')
df_4 = pd.read_csv('./k-folds-history/CNN_Model_F_4.csv')
df_5 = pd.read_csv('./k-folds-history/CNN_Model_F_5.csv')

#%%
print('Fold 1: ' + str(df_1['training_acc'].to_numpy()[-1]) + ' ' + str(df_1['val_acc'].to_numpy()[-1]))
print('Fold 2: ' + str(df_2['training_acc'].to_numpy()[-1]) + ' ' + str(df_2['val_acc'].to_numpy()[-1]))
print('Fold 3: ' + str(df_3['training_acc'].to_numpy()[-1]) + ' ' + str(df_3['val_acc'].to_numpy()[-1]))
print('Fold 4: ' + str(df_4['training_acc'].to_numpy()[-1]) + ' ' + str(df_4['val_acc'].to_numpy()[-1]))
print('Fold 5: ' + str(df_5['training_acc'].to_numpy()[-1]) + ' ' + str(df_5['val_acc'].to_numpy()[-1]))

#%%
val_acc_df = pd.DataFrame(data={
    'Epoch': range(1, 51),
    'Fold 1': df_1['val_acc'].to_numpy(),
    'Fold 2': df_2['val_acc'].to_numpy(),
    'Fold 3': df_3['val_acc'].to_numpy(),
    'Fold 4': df_4['val_acc'].to_numpy(),
    'Fold 5': df_5['val_acc'].to_numpy(),
})

plt.figure(figsize=(15, 5))
plt.plot(val_acc_df['Epoch'], val_acc_df['Fold 1'], 'y--', label='Fold 1', linewidth=0.5)
plt.plot(val_acc_df['Epoch'], val_acc_df['Fold 2'], 'b--', label='Fold 2', linewidth=0.5)
plt.plot(val_acc_df['Epoch'], val_acc_df['Fold 3'], 'g--', label='Fold 3', linewidth=0.5)
plt.plot(val_acc_df['Epoch'], val_acc_df['Fold 4'], 'r-', label='Fold 4', linewidth=2)
plt.plot(val_acc_df['Epoch'], val_acc_df['Fold 5'], 'k--', label='Fold 5', linewidth=0.5)
plt.legend()
plt.ylabel('Accuracy')
plt.xlabel('Epochs')
plt.grid(False)
plt.savefig('./figures/result-analysis-val-acc-2.png')
plt.show()