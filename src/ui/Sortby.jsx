import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({options}) {
    const [SearchSortParams, setSearchSortParams] = useSearchParams();
    const sortValue = SearchSortParams.get("sortBy") || options[0].value;  
    function editOptions(e) {
        SearchSortParams.set("sortBy", e.target.value);
        console.log('SearchSortParams',SearchSortParams);
        setSearchSortParams(SearchSortParams);
    }
    return (
        <Select options={options} type="grey" onChange={editOptions} value={sortValue}></Select>
    )
};

export default SortBy;