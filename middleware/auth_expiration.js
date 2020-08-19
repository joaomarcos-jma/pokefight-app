export default (context) => {
    let current_time = Math.round(new Date().getTime() / 1000)
    if (current_time > context.store.state.expiresUser) {
        context.store.dispatch("refreshToken");
    }
}