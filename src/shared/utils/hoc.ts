// function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
//     // используем class expression
//   return class extends Component {
//     constructor(props) {
//       super({...props, ...mapStateToProps(store.getState())});

//       // подписываемся на событие
//         store.on(StoreEvents.Updated, () => {
//           // вызываем обновление компонента, передав данные из хранилища
//           this.setProps({...mapStateToProps(store.getState())});
//             });
//     }
//   }
// }

// function mapUserToProps(state) {
//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//   };
// }

// connect(UserProfile, mapUserToProps);

// function connect(mapStateToProps: (state: Indexed) => Indexed) {
//     return function(Component: typeof Block) {
//       return class extends Component {
//         ...
//       }
//       }
//   }

//   const withUser = connect(state => ({ user: state.user }));

//   withUser(UserProfile);
//   withUser(SettingsPage);

/*
    function connect(mapStateToProps: (state: Indexed) => Indexed) {
      return function(Component: typeof Block) {
        return class extends Component {
          constructor(props) {
                    // сохраняем начальное состояние
                    let state = mapStateToProps(store.getState());
    
              super({...props, ...state});
    
              // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                        // при обновлении получаем новое состояние
                        const newState = mapStateToProps(store.getState());
                  
                        // если что-то из используемых данных поменялось, обновляем компонент
                        if (!isEqual(state, newState)) {
                      this.setProps({...newState});
                        }
    
                        // не забываем сохранить новое состояние
                        state = newState;
                    });
            }
        }
        }
    }
    
*/
