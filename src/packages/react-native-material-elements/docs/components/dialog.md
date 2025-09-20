# Dialog Component

The `Dialog` component is used to display a popup dialog with customizable content and actions.

![Dialog Component preview](https://lh3.googleusercontent.com/d/17L22Dy-Sgf5aBTHAiJfJKx1EnE-pH_88=s900?authuser=1)
![Dialog Component preview](https://lh3.googleusercontent.com/d/10kxW38g1WQPPzBhT7wAaLVM7nAfhNoc7=s900?authuser=1)

## Interfaces

### `DialogTitleProps`

The `DialogTitleProps` interface defines the properties that can be passed to a dialog title component.

#### Props

- `variation?: string`: The variation of the dialog title.

### `DialogProps`

The `DialogProps` interface extends `PortalProps` and defines additional properties for the dialog component.

#### Props

- `dialogContainerProps?: Omit<BoxProps, 'children'>`: Props to be passed to the dialog container.

### `DialogActionsProps`

The `DialogActionsProps` interface extends `BoxProps` and defines additional properties for the dialog actions component.

#### Props

- `dialogActionsContainerProps?: Omit<BoxProps, 'children'>`: Props to be passed to the dialog actions container.

## Examples

Below are examples demonstrating the usage of the `Dialog` component:

```tsx
export const Ex1: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <Dialog visible={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              paddingHorizontal: 30,
              paddingVertical: 8,
              borderRadius: 0,
            }}
            variation="text"
            onPress={() => setShowDialog(false)}>
            <Text>Close</Text>
          </Button>
        </DialogActions>
      </Dialog>
      <Button fullWidth onPress={() => setShowDialog(!showDialog)}>
        <Text>Open</Text>
      </Button>
    </View>
  );
};
```
