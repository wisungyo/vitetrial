import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from "@apollo/client";
import { setCookie, getCookie } from "cookies-next"

const httpLink = new HttpLink({ 
    uri: 'http://10.122.2.36:3000/shop-api',
    credentials: 'include'
})

const afterwareLink = new ApolloLink((operation, forward) => {
    if (forward === undefined)
        return null
    return forward(operation).map(response => {
        const context = operation.getContext()
        const { response: { headers } } = context
        if (headers) {
            const refreshToken = headers.get('vendure-auth-token')
            if (refreshToken) {
                setCookie('VENDURE_TOKEN', refreshToken)
            }
        }

        return response
    })
})

const authLink = new ApolloLink((operation, forward) => {
    if (forward === undefined)
        return null
    operation.setContext(({ headers = {} }) => {
        const token = getCookie("VENDURE_TOKEN")
        return { 
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })
    return forward(operation)
})


export const getClient = () => {

    return new ApolloClient({
        uri: process.env.apiPrefix,
        cache: new InMemoryCache(),
        link: ApolloLink.from([afterwareLink, authLink, httpLink]),
    });
}