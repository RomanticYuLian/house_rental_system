function validatorTelephone(rule, value, callback) {
    if (value === "") {
        callback(new Error(" 手机号不能为空 "));
    } else if (
        !/^(13[0-9]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
            value
        )
    ) {
        callback(new Error(" 手机号格式错误 "));
    } else {
        callback();
    }
}


function validatorUsername(rule, value, callback) {
    if (value === "") {
        callback(new Error(" 用户名不能为空 "));
    } else if (!/^[\u4e00-\u9fa5A-Za-z\S]{2,12}$/.test(value)) {
        callback(new Error(" 用户名格式错误 "));
    } else {
        callback();
    }
}


// 通用验证规则
export default {
    // 手机号
    telephoneRules: [
        {
            required: true,
            validator: validatorTelephone,
            trigger: "blur",
        },
    ],
    //用户名
    usernameRules: [
        {
            required: true,
            validator: validatorUsername,
            trigger: "blur",
        },
    ],
    // 密码
    passwordRules: [
        {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
        },
        {
            min: 5,
            max: 16,
            message: "密码长度在 5 到 16 个字符",
            trigger: "blur",
        },
    ],
    
};