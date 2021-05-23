

class BlogSerializer(serializers.ModelSerializer):
    First_Name = serializers.CharField(max_length=80)
    Last_Name = serializers.CharField(max_length=80)
    Username = serializers.CharField(required=True,validators=[UniqueValidator(queryset=User.objects.all(), massage="Username aready exists")])
    Email = serializers.CharField(required=True,validators=[UniqueValidator(queryset=User.objects.all(), massage="Email aready exists")])
    Password = serilizers.CharField(min_length=6,required=True,write_only=True)

    class Meta:
        model = Blog
        fields = ["id","First_Name","Last_Name","Username","Email","Password"]
    def get_first_name(self,obj):
        return obj.Username.capitalize()

