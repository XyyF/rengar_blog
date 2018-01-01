const dialog = {
    name: 'rg-dialog',
    template: '<div v-show="isShowDialog" id="dialog"><slot></slot></div>',
    data() {
        return {
            isShowDialog: false,
        }
    },
    methods: {
        // 隐藏dialog
        hiddenDialog() {
            this.isShowDialog = false
        },
        // 隐藏dialog
        showDialog() {
            this.isShowDialog = true
        },
    },
}

export default dialog
