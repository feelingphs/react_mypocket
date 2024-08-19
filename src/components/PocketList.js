import React from 'react';

function PocketList(props) {
    return(
        <div className="pocket_list">
            {
            props.pocketData.map((data, i) => {
                return(
                <button className={ "pocket_item " + data.type } key={ i }>
                    <div className="item_info">
                        <span className="item_name">{ data.name }</span>
                        <span className="item_category">{ data.category }</span>
                    </div>
                    <div className="item_price">{ props.formatNumber(data.price) } 원</div>
                </button>
                )
            })
            }
            <button className="pocket_add" onClick={() => {props.setLayer(true)}}>
                <span>+</span>
            </button>
        </div>
    )
}

export default PocketList;