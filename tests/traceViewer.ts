export const valueTrace = {
    heading: "Trace viewer",
    button:  "Watch Viewing Playwright Traces",
    iframe: "Viewing Playwright Traces",
    watsNew: {
        heading: "What's next",
        list: {
            runTests: "Run tests on CI with GitHub Actions",
            learnMore: "Learn more about Trace Viewer",
        }
    }, flippingPage: {
        previous: "Previous",
        next: "Next"
    },
    flippingMenu: {
      previous: "Running and debugging tests",
      next: "Setting up CI",  
    }
} 

export const locatorTrace = {
    video: {
        button: `button[aria-label = "${valueTrace.button}"]`,
        load: `//iframe[@title="${valueTrace.iframe}"]`
    },
    flipping: {
        pages: ".pagination-nav__sublabel",
        menu: ".pagination-nav__label",
    }
}