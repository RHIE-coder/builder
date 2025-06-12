import { GridColumn, GridCell, GridCellKind, DataEditor, Item } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import React, { useCallback, useState, useEffect } from "react";

type Person = {
  firstName: string;
  lastName: string;
};

export default function EditableGrid() {

  const [data, setData] = useState<Person[]>([
    {
      firstName: "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn",
      lastName: "Doe",
    },
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
  ]);

  const [columns, setColumns] = useState<GridColumn[]>([
    { title: "First Name", width: 200 },
    { title: "Last Name", width: 300 },
  ]);

  // 초기 컬럼 너비 계산
  useEffect(() => {
    const newColumns = [...columns];
    
    // First Name 컬럼 너비 계산
    const firstNameMaxLength = Math.max(...data.map(item => {
      return item.firstName.split('').reduce((acc, char) => {
        return acc + (/[가-힣]/.test(char) ? 1.5 : 1);
      }, 0);
    }));
    newColumns[0] = {
      ...newColumns[0],
      width: Math.max(100, firstNameMaxLength * 8 + 16)
    };

    // Last Name 컬럼 너비 계산
    const lastNameMaxLength = Math.max(...data.map(item => {
      return item.lastName.split('').reduce((acc, char) => {
        return acc + (/[가-힣]/.test(char) ? 1.5 : 1);
      }, 0);
    }));
    newColumns[1] = {
      ...newColumns[1],
      width: Math.max(100, lastNameMaxLength * 8 + 16)
    };

    setColumns(newColumns);
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const getCellContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const person = data[row];

      if (col === 0) {
        return {
          kind: GridCellKind.Text,
          data: person.firstName,
          allowOverlay: true,
          readonly: false,
          displayData: person.firstName,
          allowWrapping: true,
          contentAlign: "left",
        };
      } else {
        return {
          kind: GridCellKind.Text,
          data: person.lastName,
          allowOverlay: true,
          readonly: false,
          displayData: person.lastName,
          allowWrapping: true,
          contentAlign: "left",
        };
      }
    },
    [data]
  );

  const onCellEdited = useCallback(
    (cell: Item, newValue: GridCell) => {
      const [col, row] = cell;

      if (newValue.kind === GridCellKind.Text) {
        const updated = [...data];
        if (col === 0) {
          updated[row].firstName = newValue.data;
        } else {
          updated[row].lastName = newValue.data;
        }
        setData(updated);

        // 컬럼 너비 자동 조정
        const newColumns = [...columns];
        const maxLength = Math.max(...updated.map(item => {
          const text = item[col === 0 ? 'firstName' : 'lastName'];
          // 한글은 1.5배, 영문/숫자는 1배로 계산
          return text.split('').reduce((acc, char) => {
            return acc + (/[가-힣]/.test(char) ? 1.5 : 1);
          }, 0);
        }));
        newColumns[col] = {
          ...newColumns[col],
          width: Math.max(100, maxLength * 8 + 16) // 문자당 8px + 패딩 16px
        };
        setColumns(newColumns);
      }
    },
    [data, columns]
  );

  const getRowHeight = useCallback(
    (row: number) => {
      const firstName = data[row].firstName;
      const lastName = data[row].lastName;
  
      const maxLength = Math.max(firstName.length, lastName.length);
      const lineCount = Math.ceil(maxLength / 30);
      return Math.max(36, lineCount * 24);
    },
    [data]
  );
  return (
    <div style={{ height: 500, width: 500 }}>
      <DataEditor
        getCellContent={getCellContent}
        onCellEdited={onCellEdited} 
        columns={columns}
        rows={data.length}
        rowHeight={getRowHeight}
        smoothScrollX
        smoothScrollY
        isDraggable={false}
        showSearch={false}
      />
    </div>
  );
}
