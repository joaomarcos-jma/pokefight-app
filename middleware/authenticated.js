export default (context) => {
    if (!context.store.state.isLoggedIn) {
        return context.redirect('/login')
    }
}