# def berke():
#     print("berke")
# def loop():
#     while 1:
#         print(1)
# berke()
# #loop()
import sys

print("Parametreler:", str(sys.argv))

if len(sys.argv) > 1:

    for index, arg in enumerate(sys.argv[1:], start=1):
        arg =int(arg)
        print(f"Argüman {index}: {arg} and type of it {type(arg)}")