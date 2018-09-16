import * as React from 'react';
import './CreateTweet.scss';

import { DefaultButton } from '../Common/Button';
import { TextArea } from '../Common/Inputs';

import { IStores } from '../../interfaces/stores';
import { inject, observer } from 'mobx-react';

interface ITweetProps {
  stores?: IStores
}

@inject('stores')
@observer
export class CreateTweet extends React.Component<ITweetProps> {
  constructor(props: ITweetProps) {
    super(props);
    this.handleCreateTweet = this.handleCreateTweet.bind(this);
  }

  handleCreateTweet() {
    this.props.stores.tweetsStore.addTweet(1, this.props.stores.textareaStore.content)
      .then(() => 
        this.props.stores.textareaStore.setInitValue()
      );
  }

  render () {
    return (
      <div className="content__create-tweet">
        <TextArea 
          maxChars="150"
        />
        <div>
          <DefaultButton handleOnClick={this.handleCreateTweet}/>
        </div>
      </div>
    );
  }
}
