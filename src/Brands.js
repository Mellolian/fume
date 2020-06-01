

export default function Brands(props) {

    let brands = new Set()
    props.info.filter(item => item.price < item.rawPrice).forEach(item => {
        brands.add(item.brand)
    })
    let listOfBrands = [...brands]

    let groupedItems = {}
    for (let i = 0;i < listOfBrands.length;i++) {
        groupedItems[listOfBrands[i]] = props.info.filter(item => item.brand === listOfBrands[i])
    }
    const keysSorted = Object.keys(groupedItems).sort(function(a,b){return groupedItems[b].length-groupedItems[a].length})
    let Obj = {};
    keysSorted.forEach(key => Obj[key] = groupedItems[key])

    return(Obj)
}