

export default function Brands(props) {

    let brands = new Set()
    props.info.forEach(item => {
        brands.add(item.brand)
    })
    let listOfBrands = [...brands]
    let groupedItems = {}
    for (let i = 0;i < listOfBrands.length;i++) {
        groupedItems[listOfBrands[i]] = props.info.filter(item => item.brand === listOfBrands[i])
    }
    return(groupedItems)
}