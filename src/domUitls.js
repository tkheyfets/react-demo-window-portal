export function copyStyles(source, target) {
    Array.from(source.styleSheets).forEach(styleSheet => {
        const element = source.createElement(styleSheet.cssRules ? "style" : "link")
        if (styleSheet.cssRules) {
            Array.from(styleSheet.cssRules).forEach(cssRule => {
                element.appendChild(source.createTextNode(cssRule.cssText))
            })
        } else if (styleSheet.href) {
            element.rel = "stylesheet"
            element.href = styleSheet.href
        }
        target.head.appendChild(element)
    })
}
