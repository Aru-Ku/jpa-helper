export const convertToCamelCase = (colName, firstLower = true) => {
    let camel = colName.toLowerCase().replace(/_([a-z])/g, (_, w) => w.toUpperCase());

    if(firstLower) return camel;
    else return camel[0].toUpperCase() + camel.substring(1);
}

const var_map = {
    TIMESTAMP: 'String',
    INTEGER: 'Integer',
    VARCHAR: 'String',
    CHARACTER: 'Character'
}

export const chooseVarType = (varType) => var_map[varType]