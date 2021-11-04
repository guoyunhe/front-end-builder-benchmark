import { Select } from '@alifd/next';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Products } from './Products';
import countryByCurrencyCode from './country-by-currency-code.json';

export function App() {
  return (
    <div>
      <nav>
        <Select
          label="Country - Currency"
          dataSource={countryByCurrencyCode.map((item) => ({
            value: item.currency_code,
            label: item.currency_code + '.' + item.country,
          }))}
          showSearch
        />
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="products" component={Products} />
      </Switch>
    </div>
  );
}
