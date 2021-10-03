import { convertToCamelCase, chooseVarType } from './utils';

const getBaseCode = (tableName, schemaName, className, isGenKey) => `package _addPackagePath;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
${isGenKey ? `import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;` : ``}
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "${tableName}", schema = "${schemaName}")
@Getter
@Setter
@ToString
public class ${className}Entity implements Serializable {
\t
\tprivate static final long serialVersionUID = 1L;
\t
`

const getColumnBlock = (colName, varType, varName) => `\t@Column(name = "${colName}")
\t${varType} ${varName};
\t
`

const getId = () => `\t@Id
`;

const getGeneratedKey = () => `\t@GeneratedValue(strategy = GenerationType.IDENTITY)
`;

const getEol = () => `}`

export const generateEntity = (schemaName, tableName, primaryKey, columns, generatedKey) => {
    const columnsList = columns.split('\n');
    let code = getBaseCode( tableName, schemaName, convertToCamelCase(tableName, false), !!generatedKey);

    columnsList.forEach(column => {
        const [colName, varType] = column.split(/[ ,\t]+/);
        if(Boolean(colName)) {
            if(colName === primaryKey) code += getId();
            if(colName === generatedKey) code += getGeneratedKey();
            code += getColumnBlock(colName, chooseVarType(varType), convertToCamelCase(colName));
        }
    })

    code += getEol();

    return code;
}
