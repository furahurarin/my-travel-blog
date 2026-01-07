export const PriceComparison = () => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              移動手段
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              料金目安
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              所要時間
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              メリット
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
              新幹線
            </td>
            <td className="px-6 py-4 whitespace-nowrap">¥14,000~</td>
            <td className="px-6 py-4 whitespace-nowrap">約3時間</td>
            <td className="px-6 py-4">本数が多く安定</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
              飛行機 (U25)
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-bold text-red-600 dark:text-red-400">
              ¥12,000~
            </td>
            <td className="px-6 py-4 whitespace-nowrap">約1時間</td>
            <td className="px-6 py-4">マイルが貯まる・早い</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
              高速バス
            </td>
            <td className="px-6 py-4 whitespace-nowrap">¥4,000~</td>
            <td className="px-6 py-4 whitespace-nowrap">約7時間</td>
            <td className="px-6 py-4">とにかく安い</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};