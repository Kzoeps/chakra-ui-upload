import { ChakraProvider } from '@chakra-ui/react'
import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'


const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </>
    )
}
afterEach(() => {
    cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
    return render(ui, {
        // wrap provider(s) here if needed
        wrapper: AllProviders,
        ...options,
    })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }