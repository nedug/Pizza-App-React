import React from 'react';
import LogoCart from '../img/empty-cart.png';
import { Link } from 'react-router-dom';

export const Cart = () => {

    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Корзина пустая 😕</h2>
                <p>
                    Вероятней всего, вы не выбрали ещё пиццу.<br />
                    Для того, чтобы заказать пиццу, перейдите на главную страницу.
                </p>
                <img src={LogoCart} alt="Empty cart" />

                <Link to="/" className="button button--black">
                    <span>Вернуться назад</span>
                </Link>
            </div>
        </div>
    );
};