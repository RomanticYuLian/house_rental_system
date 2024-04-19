const getters = {
    userManageData: (state) => state.manage.userManageData || [],
    userManageTotal: (state) => state.manage.userManageTotal,

    homeData: (state) => state.app.homeData || [],
    homeDataTotal: (state) => state.app.homeDataTotal,

    feedbackManageData: (state)=>state.manage.feedbackManageData || [],
    feedbackManageTotal: (state)=>state.manage.feedbackManageTotal,

    orderManageData: (state)=>state.manage.orderManageData || [],
    orderManageTotal: (state)=>state.manage.orderManageTotal,

    detailsData: (state)=>state.app.detailsData,

    myHouseData: (state)=>state.manage.myHouseData || [],
    myHouseTotal: (state)=>state.manage.myHouseTotal,

    myOrderData: (state)=>state.order.myOrderData || [],
    myOrderTotal: (state)=>state.order.myOrderTotal,

    myFeedbackData: (state)=>state.feedback.myFeedbackData || [],
    myFeedbackTotal: (state)=>state.feedback.myFeedbackTotal,

    orderDetails: (state)=>state.order.orderDetails,
};
export default getters;