
export interface TableColumn<T> {
  header: string;
  field: keyof T;
}

export type TableFactoryProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  buttonActions: (item: T) => JSX.Element[];
};

export const TableFactory = <T,>({ data, columns, buttonActions }: TableFactoryProps<T>) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                 {(item[column.field] as string)}
              </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {buttonActions(item)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
