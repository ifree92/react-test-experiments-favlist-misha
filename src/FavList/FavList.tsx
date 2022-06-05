import {useProductFake} from "./useProductFake";

export const LS_FAVLIST_PARAM = 'favList'

export function FavList() {
    const { productId } = useProductFake();

    const handleFavouriteList = (id: string) => {
        const favList = localStorage.getItem(LS_FAVLIST_PARAM);
        const idNum = +id;

        if (favList) {
            const list = JSON.parse(favList) as Array<number>;

            if (list.includes(idNum)) {
                const filtered = list.filter((item: number) => {
                    return item !== idNum;
                });
                localStorage.setItem(LS_FAVLIST_PARAM, JSON.stringify(filtered));
            } else {
                list.push(idNum);
                localStorage.setItem(LS_FAVLIST_PARAM, JSON.stringify(list));
            }
        } else {
            localStorage.setItem(LS_FAVLIST_PARAM, JSON.stringify([idNum]));
        }
    };

    return (
        <div>
            <button onClick={() => handleFavouriteList(productId)}>Handle</button>
        </div>
    );
}
