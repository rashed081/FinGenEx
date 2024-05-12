const generateDynamicMenu = (UserFunctionAccess:any) => {
    // rawFunctionsList - all the accesible functions from the login api 
    const rawFunctionsList = UserFunctionAccess;


    ////////////////////// make searchbar maps and reverse maps /////////

    const group_name_vs_child_func_cluster_dict:any = {}; // big dictionary
    const fastpath_vs_function_name_dict:any = {};
    const function_name_vs_other_data_dict:any = {};

    // other data = fast path, link
    let tempDict = {
        FunctionGroupName:"",
        FastPath:"",
        FunctionName:"",
        FunctionId:"",
        TargetPath:"",
        ConcatName:"",
        icon:"",
      
        
    };
    let funcData = {
        FastPathNo:"",
        FunctionName:"",
        FunctionId:"",
        TargetPath:"",
    };

    for (funcData of rawFunctionsList) {
        tempDict = {
            FunctionGroupName: "Instruction", //funcData.ServiceName,
            FastPath: funcData.FastPathNo,
            FunctionName: funcData.FunctionName,
            FunctionId: funcData.FunctionId, // will stay fixed
            TargetPath: "/" + funcData.TargetPath.replace('\\', '/'), // without the first '/' it doesn't start it as the root.
            ConcatName: funcData.FastPathNo + "-" + funcData.FunctionName.trim(),
            icon: "local_activity",
        };
      
        // comment out later. maybe?
        tempDict.FunctionGroupName = tempDict.FunctionGroupName.replace("UltimusNex - ", "");

        if (!(tempDict.FunctionGroupName in group_name_vs_child_func_cluster_dict)) {
            group_name_vs_child_func_cluster_dict[tempDict.FunctionGroupName] = {
                FunctionGroupName: tempDict.FunctionGroupName,
                FunctionsArray: [],
            };
        }

        group_name_vs_child_func_cluster_dict[tempDict.FunctionGroupName].FunctionsArray.push(
            tempDict
        );

        // populate fastpath_vs_function_name_dict
        fastpath_vs_function_name_dict[funcData.FastPathNo.trim()] =
            funcData.FastPathNo + "-" + funcData.FunctionName.trim();

        // populate function_name_vs_other_data_dict
        // tempDict = {
        //     FastPath: funcData.FastPathNo,
        //     TargetPath: funcData.TargetPath,
        // };

        function_name_vs_other_data_dict[
            funcData.FastPathNo + "-" + funcData.FunctionName.trim()
        ] = tempDict;
    }

    const final_fastpath_vs_function_name_dict = fastpath_vs_function_name_dict;
    const final_function_name_vs_other_data_dict = function_name_vs_other_data_dict;
    return [group_name_vs_child_func_cluster_dict, final_fastpath_vs_function_name_dict, final_function_name_vs_other_data_dict];
}



const getClusterNamesForSidebar = (group_name_vs_child_func_cluster_dict:any) => {
    const group_names_list = Object.keys(
        group_name_vs_child_func_cluster_dict
    );

    const items = [];

    for (const group of group_names_list) {
        const item = {
            active: false,
            text: group,
            icon: "mdi-account",
        }
        items.push(item);
    }

    return items;
}

const generateFunctionList = (UserFunctionAccess:any) => {
    const rawFunctionsList = UserFunctionAccess;
   
    // other data = fast path, link
    const functionDataList:any = [];
    let funcData = {
        FastPathNo:"",
        FunctionName:"",
        FunctionId:"",
        TargetPath:"",
    };
    let tempDict = {
        FunctionGroupName:"",
        FastPath:"",
        FunctionName:"",
        FunctionId:"",
        TargetPath:"",
        ConcatName:"",
        icon:""
    };

    for ( funcData of rawFunctionsList) {
        tempDict = {
            FunctionGroupName: "Instruction", //funcData.ServiceName,
            FastPath: funcData.FastPathNo,
            FunctionName: funcData.FunctionName,
            FunctionId: funcData.FunctionId, // will stay fixed
            TargetPath: "/" + funcData.TargetPath.replace('\\', '/'), // without the first '/' it doesn't start it as the root.
            ConcatName: funcData.FastPathNo + "-" + funcData.FunctionName, //.trim(),
            icon: "local_activity",
        };
        functionDataList.push(tempDict);
    }
    return functionDataList;
}

export {
    generateDynamicMenu,
    getClusterNamesForSidebar,
    generateFunctionList
}