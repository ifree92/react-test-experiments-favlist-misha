import {FavList, LS_FAVLIST_PARAM} from './FavList'
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";

const MOCK_PRODUCT_ID = '123'

jest.mock('./useProductFake', () => {
    const useProductFake = () => ({productId: MOCK_PRODUCT_ID})
    return {
        useProductFake
    }
})

describe('FavList', () => {
    let LocalStorageMock = {
        getItem: () => {
        },
        setItem: () => {
        }
    }

    beforeAll(() => {
        LocalStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn()
        }
        Object.defineProperty(window, 'localStorage', {value: LocalStorageMock})
    })

    // beforeEach(() => {
    //     LocalStorageMock
    // })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('should get list', async () => {
        render(<FavList/>)
        const buttonEl = screen.getByText('Handle')
        fireEvent.click(buttonEl)

        expect(LocalStorageMock.getItem).toHaveBeenCalledTimes(1)
        expect(LocalStorageMock.getItem).toHaveBeenCalledWith(LS_FAVLIST_PARAM)
    })

    it('should set one item if LS is empty', async () => {
        render(<FavList/>)
        const buttonEl = screen.getByText('Handle')
        fireEvent.click(buttonEl)

        expect(LocalStorageMock.setItem).toHaveBeenCalledTimes(1)
        expect(LocalStorageMock.setItem).toHaveBeenCalledWith(LS_FAVLIST_PARAM, '[123]')
    })

    it('should remove one if list contains item', () => {
        (localStorage.getItem as jest.Mock).mockReturnValue('[123, 456]')
        render(<FavList/>)
        const buttonEl = screen.getByText('Handle')
        fireEvent.click(buttonEl)

        expect(LocalStorageMock.setItem).toHaveBeenCalledTimes(1)
        expect(LocalStorageMock.setItem).toHaveBeenCalledWith(LS_FAVLIST_PARAM, "[456]")
    })

    it('should add one if list doesn\'t contain item', () => {
        (localStorage.getItem as jest.Mock).mockReturnValue('[456]')
        render(<FavList/>)
        const buttonEl = screen.getByText('Handle')
        fireEvent.click(buttonEl)

        expect(LocalStorageMock.setItem).toHaveBeenCalledTimes(1)
        expect(LocalStorageMock.setItem).toHaveBeenCalledWith(LS_FAVLIST_PARAM, "[456,123]")
    })
})