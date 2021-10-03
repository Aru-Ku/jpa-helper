import { convertToCamelCase, chooseVarType } from './utils'

const getBaseCode = (className) => `package _addPackagePath;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ${className}Bean {
\t
`;

const getColVar = (varType, varName) => `\t${varType} ${varName};
\t
`;

const getEol = () => `}`;

export const generateBean = (tableName, columns) => {
    let code = getBaseCode(convertToCamelCase(tableName, false))
    const columnsList = columns.split('\n');

    columnsList.forEach(column => {
        const [colName, varType] = column.split(/[ ,\t]+/);
        if(Boolean(colName)) {
            code += getColVar(chooseVarType(varType), convertToCamelCase(colName));
        }
    });

    code += getEol();

    return code;
}